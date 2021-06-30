let coinsPerPage = 100;
let currentPage = 1;
let BASE_URL = `https://api.coingecko.com/api/v3`;
let COIN_DATA_ENDPOINT =
`/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${coinsPerPage}&page=${currentPage}&sparkline=false`;
let MARKET_DATA_ENDPOINT = `/global`;
let coinUrl = BASE_URL + COIN_DATA_ENDPOINT;
let marketUrl = BASE_URL + MARKET_DATA_ENDPOINT;
let sortOrder = { column: 'market_cap', order: 'DESC' };

$(document).ready( () => {
  document.body.classList.toggle("dark-mode");
  refreshMarketTableBody();
  refreshCoinTableBody();
  fadePrev();
});

function generateMarketTableBody(data) {
  let number = Intl.NumberFormat("en-US");
  $('#coinSpan').text(data.data.active_cryptocurrencies);
  $('#exchangesSpan').text(data.data.markets);
  $('#totalMarketCapSpan').text("$" + number.format(data.data.total_market_cap.usd.toFixed(0)));
  $('#totalMarketCapSpanPercent').addClass(`${data.market_cap_change_percentage_24h_usd >= 0 ?
     "text-success" : "text-danger"}`);
  $('#totalMarketCapSpanPercent').text(" " + (data.data.market_cap_change_percentage_24h_usd).toFixed(2) + "%");
  $('#_24hVolSpan').text("$" + number.format(data.data.total_volume.usd.toFixed(0)));
  $('#btcSpan').text("BTC " + Number(data.data.market_cap_percentage.btc).toFixed(1) +"%");
  $('#ethSpan').text(" | ETH " + Number(data.data.market_cap_percentage.eth).toFixed(1) +"%");
}

function generateCoinTableBody(data) {
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
        $('<td class="text-right"></td>').text(number.format(data[key].circulating_supply.toFixed()) +
        " " + data[key].symbol.toUpperCase()),
        $(`<td class='${data[key].price_change_percentage_24h >= 0 ? "text-success" : "text-danger"}
        text-right'></td>`).text(Number(data[key].price_change_percentage_24h).toFixed(2) + "%")
      )
    );
  };
}

function getMarketData() {
  return fetch(marketUrl)
    .then(res => {
      return res.json();
    }).then(data => {
        return data;
      }).catch(err => {
      console.log(err);
        });
};

function getCoinData() {
  return fetch(coinUrl)
    .then(res => {
      return res.json();
    }).then(data => {
        return data;
      }).catch(err => {
      console.log(err);
        });
};

async function refreshMarketTableBody() {
  generateMarketTableBody(await getMarketData());
}

async function refreshCoinTableBody() {
  generateCoinTableBody(await getCoinData());
}

// Pagination

$("#nAnchor").click(async () => {
  currentPage++;
  COIN_DATA_ENDPOINT =
  `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${coinsPerPage}&page=${currentPage}&sparkline=false`;
  coinUrl = BASE_URL + COIN_DATA_ENDPOINT;
  await refreshCoinTableBody();
  fadePrev();
});

$("#pAnchor").click(async () => {
  currentPage--;
  COIN_DATA_ENDPOINT =
  `/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=${coinsPerPage}&page=${currentPage}&sparkline=false`;
  coinUrl = BASE_URL + COIN_DATA_ENDPOINT;
  await refreshCoinTableBody();
  fadePrev();
});

function fadePrev() {
  $("#pageNumber").text("Page: " + currentPage);
  if (currentPage == 1) {
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
  sortCoinList($('this').prevObject[0].activeElement.name,
  getSortOrder($('this').prevObject[0].activeElement.name));
});

function getSortOrder(columnName) {
  if (sortOrder.column == columnName) {
    if (sortOrder.order == 'DESC') {
      return 'ASC';
    }
    return 'DESC';
  }
  return 'ASC';
}

async function sortCoinList(headerName, order) {
  generateCoinTableBody(sortData(await getCoinData(), headerName, order));
}

function updateSortOrder(headerName, order) {
  sortOrder.column = headerName;
  sortOrder.order = order;
}

function sortData(data, headerName, order) {
  if (order == 'ASC') {
    sortAscending(data, headerName);
  } else {
    sortDescending(data, headerName);
  };
  updateSortOrder(headerName, order);
  return data;
}

function sortAscending(data, headerName) {
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

function sortDescending(data, headerName) {
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
