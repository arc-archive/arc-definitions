import '@advanced-rest-client/arc-demo-helper/arc-demo-helper.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-radio-group/paper-radio-group.js';
import '@polymer/paper-radio-button/paper-radio-button.js';
import '@polymer/paper-button/paper-button.js';
import '../arc-definitions.js';

document.querySelector('#queryButton').addEventListener('click', function() {
  const type = document.querySelector('#type').selected;
  const query = document.querySelector('#headerName').value;
  const e = new CustomEvent('query-headers', {
    detail: {
      type,
      query
    },
    bubbles: true
  });
  document.dispatchEvent(e);
  const fragment = document.createDocumentFragment();
  const result = e.detail.headers || [];
  result.forEach((header) => {
    const li = document.createElement('li');
    const key = document.createElement('b');
    key.innerText = header.key;
    const desc = document.createTextNode(` - ${header.desc}`);
    li.appendChild(key);
    li.appendChild(desc);
    fragment.appendChild(li);
  });
  const node = document.querySelector('#headerResults');
  while (node.firstChild) {
    node.removeChild(node.firstChild);
  }
  node.appendChild(fragment);
});

document.querySelector('#statusButton').addEventListener('click', function() {
  const code = document.querySelector('#codeValue').value;
  const e = new CustomEvent('query-status-codes', {
    detail: {
      code
    },
    bubbles: true
  });
  document.dispatchEvent(e);
  const node = document.querySelector('#statusResults');
  const codeResult = e.detail.statusCode;
  if (!codeResult) {
    node.innerHTML = '';
  } else {
    node.innerHTML = `<h2>${codeResult.label}</h2>${codeResult.desc}`;
  }
});
