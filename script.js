$(document).ready(function(){
  $('#searchInput').on('keyup', function() {
    var searchText = $(this).val().toLowerCase();

    $('#myTable tbody tr').filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(searchText) > -1);
    });
  });
});
