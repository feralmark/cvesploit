# cvesploit






<table id="mytable">
<thead>
	<tr>
		<th>First name</th>
 		<th>Last name</th>
 		<th>City</th>
 		<th>Country</th>
 	</tr>
</thead>
<tbody>
	<tr>
 		<td>Homer</td>
 		<td>Simpson</td>
 		<td>Springfield</td>
 		<td>USA</td>
 	</tr>
 	<!-- ...and so on -->
</tbody>
</table>


<div id="table-filters">
 	<label for="filter-country">Country:</label>
	<input type="text" id="filter-country" data-filter-col="3">
</div>


<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>

<script src="filtable.js"></script>


$('#mytable').filtable({ controlPanel: $('#table-filters') });

 









































