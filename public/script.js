const resultsDiv = document.getElementById('results');
const searchBtn = document.getElementById('searchBtn');

if (searchBtn) {
  searchBtn.addEventListener('click', async () => {
    const keyword = document.getElementById('keyword').value;
    const classification =
      document.getElementById('classification').value;

    let url = '/recalls';

    if (keyword) {
      url += `?keyword=${keyword}`;
    } else if (classification) {
      url += `?classification=${classification}`;
    }

    const response = await fetch(url);
    const data = await response.json();

    resultsDiv.innerHTML = '';

    data.results.forEach((recall) => {
      const card = document.createElement('div');
      card.className = 'recall-card';

      card.innerHTML = `
        <h3>${recall.product_description}</h3>
        <p><strong>Classification:</strong> ${recall.classification}</p>
        <p>${recall.reason_for_recall}</p>
        <button class="save-btn">Save</button>
      `;

      const saveBtn = card.querySelector('.save-btn');

      saveBtn.addEventListener('click', async () => {
        await fetch('/saved-recalls', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            product_description: recall.product_description,
            reason_for_recall: recall.reason_for_recall,
            classification: recall.classification,
            report_date: recall.report_date,
          }),
        });

        Swal.fire('Saved!', 'Recall added to watchlist.', 'success');
      });

      resultsDiv.appendChild(card);
    });

    createChart(data.results);
  });
}

async function loadWatchlist() {
  const watchlistDiv = document.getElementById('watchlistResults');

  if (!watchlistDiv) return;

  const response = await fetch('/saved-recalls');
  const data = await response.json();

  data.forEach((recall) => {
    const card = document.createElement('div');

    card.className = 'recall-card';

    card.innerHTML = `
      <h3>${recall.product_description}</h3>
      <p>${recall.classification}</p>
      <p>${recall.reason_for_recall}</p>
    `;

    watchlistDiv.appendChild(card);
  });
}

function createChart(recalls) {
  const canvas = document.getElementById('recallChart');

  if (!canvas) return;

  const classCounts = {
    'Class I': 0,
    'Class II': 0,
    'Class III': 0,
  };

  recalls.forEach((recall) => {
    if (classCounts[recall.classification] !== undefined) {
      classCounts[recall.classification]++;
    }
  });

  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: Object.keys(classCounts),
      datasets: [
        {
          label: 'Recall Count',
          data: Object.values(classCounts),
        },
      ],
    },
  });
}

loadWatchlist();