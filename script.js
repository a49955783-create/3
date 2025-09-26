let insurances = JSON.parse(localStorage.getItem('insurances')) || [];

function enterApp() {
  document.getElementById('intro').style.display = 'none';
}

function openModal() {
  document.getElementById('modal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('modal').style.display = 'none';
}

function previewImage(event) {
  const preview = document.getElementById('preview');
  preview.src = URL.createObjectURL(event.target.files[0]);
  preview.style.display = 'block';
}

document.getElementById('insuranceForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const nationalId = document.getElementById('nationalId').value;
  const category = document.getElementById('category').value;
  const expiryDate = document.getElementById('expiryDate').value;
  const image = document.getElementById('preview').src;

  const newInsurance = { name, nationalId, category, expiryDate, image };
  insurances.push(newInsurance);
  localStorage.setItem('insurances', JSON.stringify(insurances));
  renderCards();
  closeModal();
});

function renderCards() {
  const container = document.getElementById('cardsContainer');
  container.innerHTML = '';
  const today = new Date();

  insurances.forEach((insurance, index) => {
    const expiry = new Date(insurance.expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let progressColor = diffDays > 30 ? 'green' : diffDays > 7 ? 'yellow' : 'red';
    let progressPercent = Math.max(0, Math.min(100, (diffDays / 365) * 100));

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${insurance.image}" onclick="openImageModal('${insurance.image}')">
      <h3>${insurance.name}</h3>
      <p>${insurance.nationalId}</p>
      <p>${insurance.category}</p>
      <p>${insurance.expiryDate}</p>
      <p>${diffDays > 0 ? `باقي ${diffDays} يوم` : 'انتهى — رجاء التجديد'}</p>
      <div class="progress" style="background:${progressColor}; width:${progressPercent}%;"></div>
      <button onclick="editInsurance(${index})">تعديل</button>
      <button onclick="deleteInsurance(${index})">إزالة</button>
    `;
    container.appendChild(card);
  });
}

function openImageModal(src) {
  document.getElementById('modalImage').src = src;
  document.getElementById('imageModal').style.display = 'flex';
}

function closeImageModal() {
  document.getElementById('imageModal').style.display = 'none';
}

function deleteInsurance(index) {
  if (confirm('هل تريد حذف التأمين؟')) {
    insurances.splice(index, 1);
    localStorage.setItem('insurances', JSON.stringify(insurances));
    renderCards();
  }
}

function editInsurance(index) {
  alert('ميزة التعديل قيد التطوير');
}

function searchInsurance() {
  const query = document.getElementById('search').value.toLowerCase();
  const filtered = insurances.filter(ins => 
    ins.name.toLowerCase().includes(query) || ins.nationalId.includes(query)
  );
  renderFiltered(filtered);
}

function renderFiltered(filtered) {
  const container = document.getElementById('cardsContainer');
  container.innerHTML = '';
  const today = new Date();

  filtered.forEach((insurance, index) => {
    const expiry = new Date(insurance.expiryDate);
    const diffTime = expiry - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    let progressColor = diffDays > 30 ? 'green' : diffDays > 7 ? 'yellow' : 'red';
    let progressPercent = Math.max(0, Math.min(100, (diffDays / 365) * 100));

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${insurance.image}" onclick="openImageModal('${insurance.image}')">
      <h3>${insurance.name}</h3>
      <p>${insurance.nationalId}</p>
      <p>${insurance.category}</p>
      <p>${insurance.expiryDate}</p>
      <p>${diffDays > 0 ? `باقي ${diffDays} يوم` : 'انتهى — رجاء التجديد'}</p>
      <div class="progress" style="background:${progressColor}; width:${progressPercent}%;"></div>
      <button onclick="editInsurance(${index})">تعديل</button>
      <button onclick="deleteInsurance(${index})">إزالة</button>
    `;
    container.appendChild(card);
  });
}

renderCards();