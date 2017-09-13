(function () {
  const root = document.querySelector('.app-root');
  const navigation = document.getElementById('navigation');

  function render(data) {
    const json = JSON.parse(data);
    console.log(json);
    root.innerHTML = `<h1>${json.title}</h1><p>${json.content}</p>`;
  }

  function renderHtml(html) {
    root.innerHTML = html;
  }

  function get(url) {
    return new Promise((resolve, reject) => {
      const req = new XMLHttpRequest();
      req.open('GET', url);
      req.send();

      req.onreadystatechange = function () {
        if (req.readyState === XMLHttpRequest.DONE) {
          if (req.status === 200) resolve(req.response);
          else reject(req.statusText);
        }
      };
    });
  }

  const routes = {
    '/': function () {
      get('/data/home.json').then(render);
    },
    '/service': function () {
      get('/data/service.json').then(render);
    },
    '/about': function () {
      get('/data/about.html').then(renderHtml);
    },
    otherwise(path) {
      root.innerHTML = `${path} Not Found`;
    }
  };

  function router(path) {
    (routes[path] || routes.otherwise)(path);
  }

  // history entry가 변경되면 발생하는 이벤트
  // PJAX 방식은 hash를 사용하지 않으므로 hashchange 이벤트를 사용할 수 없다.
  // popstate event는 pushState에 의해 발생시키지 않는다.
  // 이전페이지 / 다음페이지 button 또는 history.back() / history.go(n)에 의해 발생한다.
  window.addEventListener('popstate', e => {
    // e.state는 pushState 메소드의 첫번째 인수
    console.log('[popstate]', e.state);
    // 이전페이지 / 다음페이지 button이 클릭되면 router를 호출
    router(e.state.path);
  });

  // 네비게이션을 클릭하면 주소창의 url이 변경되므로 서버로 요청이 전송된다.
  // preventDefault를 사용하여 이를 방지하고 history 관리를 위한 처리를 실시
  navigation.addEventListener('click', e => {
    if (!e.target || e.target.nodeName !== 'A') return;
    e.preventDefault();
    // 이동 페이지
    const path = e.target.getAttribute('href');

    // 주소창의 url은 변경되지만 요청하지는 않는다.
    history.pushState({ path }, null, path);
    // path에 의한 AJAX 요청
    router(path);
  });

  // 웹페이지가 처음 로딩되었을 때
  router('/');

  // DOMContentLoaded은 HTML과 script가 로드된 시점에 발생하는 이벤트로 load 이벤트보다 먼저 발생한다. (IE 9 이상 지원)
  // window.addEventListener('DOMContentLoaded', router);

  // 새로고침이 클릭되었을 때, 현 페이지(예를들어 loclahost:5004/service)가 서버에 요청된다.
  // 서버측에는 이에 응답하는 기능이 추가되어야 한다.
}());
