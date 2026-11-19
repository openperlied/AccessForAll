const sites = {
  riverside: ['Riverside Hall', 'Monday, 10 am to noon. Use the east entrance on Maple Street.'],
  market: ['Market Square', 'Thursday, 2 to 4 pm. Meet the pantry team beside the clock tower.']
};
const site = document.querySelector('#site');
const heading = document.querySelector('#site-name');
const details = document.querySelector('#instructions');
function showSite() {
  const [name, instructions] = sites[site.value];
  heading.textContent = name;
  details.textContent = instructions;
}
site.addEventListener('change', showSite);
showSite();
