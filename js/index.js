let coinsPerPageUSD = 100;
let currentPageUSD = 1;
let BASE_URL_USD = `https://api.coingecko.com/api/v3`;
let COIN_DATA_ENDPOINT_USD =
`/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${coinsPerPageUSD}&page=${currentPageUSD}&sparkline=true&price_change_percentage=7d`;
let coinUrlUSD = BASE_URL_USD + COIN_DATA_ENDPOINT_USD;
let sortOrderUSD = { column: 'market_cap', order: 'DESC' };

$(document).ready( () => {
  refreshCoinTableBodyUSD();
  fadePrevUSD();
});

function generateCoinTableBodyUSD(data) {
  let number = Intl.NumberFormat("en-US");
  $('#coinTableBody').html(""); //clears body of table
  for (let key in data) {

     $('#coinTableBody').append(
      $('<tr class="content-row"></tr>').append(
        $('<td class="text-center"></td>').text(data[key].market_cap_rank),
        $('<td id="specific" class="text-left"></td>').append(
          $('<div></div>').append(
            `<img src="${data[key].image}" width="25"> ${data[key].name}</a>`)),
        $('<td class="text-right boldText"></td>').text("$" + number.format(data[key].current_price.toFixed(2))),
        $('<td class="text-right"></td>').text("$" + number.format(data[key].market_cap)),
        $('<td class="text-right"></td>').text("$" + number.format(data[key].total_volume)),
        $(`<td class='${data[key].price_change_percentage_24h >= 0 ? "text-success" : "text-danger"}
        text-right'></td>`).text(Number(data[key].price_change_percentage_24h).toFixed(2) + "%"),
        $(`<img class="text-center" src="https://www.coingecko.com/coins/${data[key].market_cap_rank}/sparkline" srcset="https://www.coingecko.com/coins/${data[key].market_cap_rank}/sparkline 1x">`)
      )
    );
  };
}

// $(`<svg class="sparkline" width="100" height="30" stroke-width="2" stroke="blue" fill="rgba(0, 1, 255, .2)"></svg>`)

function getCoinDataUSD() {
  return fetch(coinUrlUSD)
    .then(res => {
      return res.json();
    }).then(data => {
        return data;
      }).catch(err => {
      console.log(err);
        });
};

async function refreshCoinTableBodyUSD() {
  generateCoinTableBodyUSD(await getCoinDataUSD());
}

// Pagination

$("#nAnchor").click(async () => {
  currentPageUSD++;
  COIN_DATA_ENDPOINT_USD =
  `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${coinsPerPageUSD}&page=${currentPageUSD}&sparkline=false`;
  coinUrl = BASE_URL_USD + COIN_DATA_ENDPOINT_USD;
  await refreshCoinTableBodyUSD();
  fadePrevUSD();
});

$("#pAnchor").click(async () => {
  currentPageUSD--;
  COIN_DATA_ENDPOINT_USD =
  `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${coinsPerPageUSD}&page=${currentPageUSD}&sparkline=false`;
  coinUrl = BASE_URL_USD + COIN_DATA_ENDPOINT_USD;
  await refreshCoinTableBodyUSD();
  fadePrevUSD();
});

function fadePrevUSD() {
  $("#pageNumber").text("Page: " + currentPageUSD);
  if (currentPageUSD == 1) {
    $("#pAnchor").hide();
  } else {
    $("#pAnchor").show();
  }
};

/* Sorting
   Table headers can be accessed through the class 'sortable' to connect a click event handler
   Each column has a unique name by which it can be identified.
   The data comes presorted by Market Cap in descending order as defined in URL endpoint.*/

$('a.sortable').click(() => {
  sortCoinListUSD($('this').prevObject[0].activeElement.name,
  getSortOrderUSD($('this').prevObject[0].activeElement.name));
});

function getSortOrderUSD(columnName) {
  if (sortOrder.column == columnName) {
    if (sortOrder.order == 'DESC') {
      return 'ASC';
    }
    return 'DESC';
  }
  return 'ASC';
}

async function sortCoinListUSD(headerName, order) {
  generateCoinTableBodyUSD(sortDataUSD(await getCoinDataUSD(), headerName, order));
}

function updateSortOrderUSD(headerName, order) {
  sortOrder.column = headerName;
  sortOrder.order = order;
}

function sortDataUSD(data, headerName, order) {
  if (order == 'ASC') {
    sortAscendingUSD(data, headerName);
  } else {
    sortDescendingUSD(data, headerName);
  };
  updateSortOrderUSD(headerName, order);
  return data;
}

function sortAscendingUSD(data, headerName) {
  data.sort(function (a, b) {
    if (a[headerName] > b[headerName]) {
      return 1;
    } else if (a[headerName] < b[headerName]) {
      return -1;
    } else {
      return 0;
    }
  });
  return data;
}

function sortDescendingusd(data, headerName) {
  data.sort(function (a, b) {
    if (a[headerName] > b[headerName]) {
      return -1;
    } else if (a[headerName] < b[headerName]) {
      return 1;
    } else {
      return 0;
    }
  });
  return data;
}
