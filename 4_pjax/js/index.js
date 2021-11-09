const root = document.getElementById('root');
const navigation = document.getElementById('navigation');

const routes = {
  // path: url path
  '/': '/data/home.json',
  '/service': '/data/service.json',
  '/about': '/data/about.html',
};

const render = async path => {
  const url = routes[path];

  try {
    const res = await fetch(url);
    const contentType = res.headers.get('content-type');

    if (contentType?.includes('application/json')) {
      const json = await res.json();
      root.innerHTML = `<h1>${json.title}</h1><p>${json.content}</p>`;
    } else {
      root.innerHTML = await res.text();
    }
  } catch (err) {
    console.error(err);
  }
};

// pjax 방식은 hash를 사용하지 않으므로 hashchange 이벤트를 사용할 수 없다.
// popstate 이벤트는 pushState에 의해 발생하지 않고
// 이전페이지/다음페이지 버튼을 클릭하거나 history.forward/back/go(n)에 의해
// history entry가 변경되면 발생한다.
window.addEventListener('popstate', e => {
  // e.state는 pushState 메서드에게 전달한 첫번째 인수 {path}
  console.log('[popstate]', e.state); // {path: '/'} {path: '/service'} {path: '/about'}

  // 이전페이지 / 다음페이지 버튼이 클릭되면 render를 호출
  render(e.state ? e.state.path : '/');
});

// 네비게이션을 클릭하면 주소창의 url이 변경되므로 HTTP 요청이 서버로 전송된다.
// preventDefault를 사용하여 이를 방지하고 history 관리를 위한 처리를 실행한다.
navigation.addEventListener('click', e => {
  if (!e.target.matches('#navigation > li > a')) return;

  e.preventDefault();

  // 이동할 페이지의 path
  const path = e.target.getAttribute('href');

  // 주소창의 url은 변경되지만 HTTP 요청이 서버로 전송되지는 않는다.
  // 첫번째 { path }는 history entry가 변경되면 발생하는 popstate 이벤트 객체(e.state)에서 취득할 수 있다.
  window.history.pushState({ path }, null, path);

  render(path);
});

// 웹페이지가 처음 로딩되었을 때
render('/');

// 새로고침을 클릭하면 현 페이지(예를 들어 loclahost:5004/service)가 서버에 요청된다.
// 이에 응답하는 처리는 서버에서 구현해야 한다.
