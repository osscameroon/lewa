// Tab functionality
document.addEventListener('DOMContentLoaded', () => {
  const tabs = document.querySelectorAll('.tabs li');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('is-active'));
      tabContents.forEach(c => c.classList.remove('is-active'));
        
      tab.classList.add('is-active');
      const tabId = tab.getAttribute('data-tab');
      document.getElementById(tabId).classList.add('is-active');
    });
  });
});
