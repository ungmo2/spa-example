(function () {
  const root = document.querySelector('.app-root');
  const navigation = document.getElementById('navigation');

  function render(data) {
    const json = JSON.parse(data);
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
    'home': function () {
      get('/data/home.json')
        .then(res => render(res));
    },
    'service': function () {
      get('/data/service.json')
        .then(res => render(res));
    },
    'about': function () {
      get('/data/about.html')
        .then(res => renderHtml(res));
    },
    otherwise(page) {
      root.innerHTML = `${page} Not Found`;
    }
  };

  function router(page) {
    (routes[page] || routes.otherwise)(page);
  }

  // AJAX 요청은 주소창의 url을 변경시키지 않으므로 history 관리가 되지 않는다.
  navigation.addEventListener('click', e => {
    if (!e.target || e.target.nodeName !== 'A') return;
    e.preventDefault();
    router(e.target.id);
  });

  // DOMContentLoaded은 HTML과 script가 로드된 시점에 발생하는 이벤트로 load 이벤트보다 먼저 발생한다. (IE 9 이상 지원)
  // 새로고침이 클릭되었을 때, 웹페이지가 처음 로딩되었을 때, 현 페이지(예를들어 loclahost:5002)를 서버에 요청한다. 이때 Home에 필요한 리소스를 Ajax 요청한다.
  window.addEventListener('DOMContentLoaded', () => router('home'));
}());
