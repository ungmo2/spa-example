const root = document.getElementById('root');
const navigation = document.getElementById('navigation');

const routes = {
  // id: url path
  home: '/data/home.json',
  service: '/data/service.json',
  about: '/data/about.html',
};

const render = async id => {
  const url = routes[id];

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

// ajax 요청은 주소창의 url을 변경시키지 않으므로 history 관리가 되지 않는다.
navigation.onclick = e => {
  if (!e.target.matches('#navigation > li > a')) return;
  e.preventDefault();
  render(e.target.id);
};

// TODO: 주소창의 url이 변경되지 않기 때문에 새로고침 시 현재 렌더링된 페이지가 아닌 루트 페이지가 요청된다.
window.addEventListener('DOMContentLoaded', () => render('home'));
