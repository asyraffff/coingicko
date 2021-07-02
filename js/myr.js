let coinsPerPageMYR = 100;
let currentPageMYR = 1;
let BASE_URL_MYR = `https://api.coingecko.com/api/v3`;
let COIN_DATA_ENDPOINT_MYR =
`/coins/markets?vs_currency=myr&order=market_cap_desc&per_page=${coinsPerPageMYR}&page=${currentPageMYR}&sparkline=true&price_change_percentage=7d`;
let coinUrlMYR = BASE_URL_MYR + COIN_DATA_ENDPOINT_MYR;
let sortOrderMYR = { column: 'market_cap', order: 'DESC' };

$(document).ready( () => {
  refreshCoinTableBodyMYR();
  // fadePrevMYR();
});

function generateCoinTableBodyMYR(data) {
  let number = Intl.NumberFormat("en-US");
  $('#coinTableBody').html(""); //clears body of table
  for (let key in data) {
     $('#coinTableBody').append(
      $('<tr class="content-row"></tr>').append(
        $('<td class="text-center"></td>').text(data[key].market_cap_rank),
        $('<td id="specific" class="text-left"></td>').append(
          $('<div></div>').append(
            `<img src="${data[key].image}" width="25"> ${data[key].name}</a>`)),
        $('<td class="text-right boldText"></td>').text("RM" + number.format(data[key].current_price.toFixed(2))),
        $('<td class="text-right"></td>').text("RM" + number.format(data[key].market_cap)),
        $('<td class="text-right"></td>').text("RM" + number.format(data[key].total_volume)),
        $(`<td class='${data[key].price_change_percentage_24h >= 0 ? "text-success" : "text-danger"}
        text-right'></td>`).text(Number(data[key].price_change_percentage_24h).toFixed(2) + "%"),
        $(`<img class="text-center" src="https://www.coingecko.com/coins/${data[key].market_cap_rank}/sparkline" srcset="https://www.coingecko.com/coins/${data[key].market_cap_rank}/sparkline 1x">`)
      )
    );
  };
}

function getCoinDataMYR() {
  return fetch(coinUrlMYR)
    .then(res => {
      return res.json();
    }).then(data => {
        return data;
      }).catch(err => {
      console.log(err);
        });
};

async function refreshCoinTableBodyMYR() {
  generateCoinTableBodyMYR(await getCoinDataMYR());
}

// Pagination

// $("#nAnchor").click(async () => {
//   currentPageMYR++;
//   COIN_DATA_ENDPOINT_MYR =
//   `/coins/markets?vs_currency=myr&order=market_cap_desc&per_page=${coinsPerPageMYR}&page=${currentPageMYR}&sparkline=false`;
//   coinUrl = BASE_URL_MYR + COIN_DATA_ENDPOINT_MYR;
//   await refreshCoinTableBodyMYR();
//   fadePrevMYR();
// });
//
// $("#pAnchor").click(async () => {
//   currentPageMYR--;
//   COIN_DATA_ENDPOINT_MYR =
//   `/coins/markets?vs_currency=myr&order=market_cap_desc&per_page=${coinsPerPageMYR}&page=${currentPageMYR}&sparkline=false`;
//   coinUrl = BASE_URL_MYR + COIN_DATA_ENDPOINT_MYR;
//   await refreshCoinTableBodyMYR();
//   fadePrevMYR();
// });
//
// function fadePrevMYR() {
//   $("#pageNumber").text("Page: " + currentPageMYR);
//   if (currentPageMYR == 1) {
//     $("#pAnchor").hide();
//   } else {
//     $("#pAnchor").show();
//   }
// };
//
// /* Sorting
//    Table headers can be accessed through the class 'sortable' to connect a click event handler
//    Each column has a unique name by which it can be identified.
//    The data comes presorted by Market Cap in descending order as defined in URL endpoint.*/
//
// $('a.sortable').click(() => {
//   sortCoinListMYR($('this').prevObject[0].activeElement.name,
//   getSortOrderMYR($('this').prevObject[0].activeElement.name));
// });
//
// function getSortOrderMYR(columnName) {
//   if (sortOrder.column == columnName) {
//     if (sortOrder.order == 'DESC') {
//       return 'ASC';
//     }
//     return 'DESC';
//   }
//   return 'ASC';
// }
//
// async function sortCoinListMYR(headerName, order) {
//   generateCoinTableBodyMYR(sortDataMYR(await getCoinDataMYR(), headerName, order));
// }
//
// function updateSortOrderMYR(headerName, order) {
//   sortOrder.column = headerName;
//   sortOrder.order = order;
// }
//
// function sortDataMYR(data, headerName, order) {
//   if (order == 'ASC') {
//     sortAscendingMYR(data, headerName);
//   } else {
//     sortDescendingMYR(data, headerName);
//   };
//   updateSortOrderMYR(headerName, order);
//   return data;
// }
//
// function sortAscendingMYR(data, headerName) {
//   data.sort(function (a, b) {
//     if (a[headerName] > b[headerName]) {
//       return 1;
//     } else if (a[headerName] < b[headerName]) {
//       return -1;
//     } else {
//       return 0;
//     }
//   });
//   return data;
// }
//
// function sortDescendingMYR(data, headerName) {
//   data.sort(function (a, b) {
//     if (a[headerName] > b[headerName]) {
//       return -1;
//     } else if (a[headerName] < b[headerName]) {
//       return 1;
//     } else {
//       return 0;
//     }
//   });
//   return data;
// }
