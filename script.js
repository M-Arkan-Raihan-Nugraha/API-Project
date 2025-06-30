const url = 'http://universities.hipolabs.com/search?country=Indonesia';
const list = document.getElementById('univ-list');
const jumlahSpan = document.getElementById('jumlah');
const searchBox = document.getElementById('searchBox');

let allUniversities = [];

fetch(url)
  .then(res => res.json())
  .then(data => {
    allUniversities = data.sort((a, b) => a.name.localeCompare(b.name));
  })
  .catch(err => console.error('Error:', err));

searchBox.addEventListener('input', () => {
  const keyword = searchBox.value.toLowerCase();
  if (keyword === '') {
    list.innerHTML = '';
    jumlahSpan.textContent = '0';
    return;
  }
  const hasil = allUniversities.filter(u => u.name.toLowerCase().includes(keyword));
  tampilkanUniversitas(hasil);
});

function tampilkanUniversitas(data) {
  list.innerHTML = '';
  data.forEach(u => {
    const li = document.createElement('li');

    const nama = document.createElement('div');
    nama.textContent = u.name;

    const website = u.web_pages[0];
    const domain = website?.replace(/^https?:\/\//, '').split('/')[0];
    const logoURL = domain ? `https://logo.clearbit.com/${domain}` : '';

    const img = document.createElement('img');
    img.src = logoURL;
    img.alt = u.name;

    img.onerror = () => {
      img.remove();
      const logoError = document.createElement('div');
      logoError.textContent = 'Logo Tidak Tersedia';
      logoError.className = 'logo-error';
      li.appendChild(logoError);
      tambahkanLink(li, website);
    };

    img.onload = () => {
      li.appendChild(img);
      tambahkanLink(li, website);
    };

    li.appendChild(nama);
    list.appendChild(li);
  });

  jumlahSpan.textContent = data.length;
}

function tambahkanLink(parent, website) {
  const label = document.createElement('span');
  label.textContent = 'Website:';
  label.className = 'link-label';

  const link = document.createElement('a');
  link.href = website;
  link.target = '_blank';
  link.textContent = website;

  parent.appendChild(label);
  parent.appendChild(link);
}