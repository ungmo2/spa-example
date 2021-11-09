const root = document.getElementById('root');

const routes = {
  // hash: url path
  '': '/data/home.json',
  service: '/data/service.json',
  about: '/data/about.html',
};

const render = async () => {
  // url의 hash를 취득
  const hash = window.location.hash.replace('#', '');
  const url = routes[hash];

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

// 네비게이션을 클릭하면 url의 hash가 변경되기 때문에 history 관리가 가능하다.
// 단, url의 hash만 변경되면 서버로 요청은 수행하지 않는다.
// url의 hash가 변경하면 발생하는 이벤트인 hashchange 이벤트를 사용하여 hash의 변경을 감지하여 필요한 ajax 요청을 수행한다.
// hash 방식의 단점은 url에 /#foo와 같은 해시뱅(HashBang)이 들어간다는 것이다.
window.addEventListener('hashchange', render);

// 새로고침을 하면 DOMContentLoaded 이벤트가 발생하고
// render 함수는 url의 hash를 취득해 새로고침 직전에 렌더링되었던 페이지를 다시 렌더링한다.
window.addEventListener('DOMContentLoaded', render);
