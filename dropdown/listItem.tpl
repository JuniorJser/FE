<%
	for(var i = 0;i<$data.length;i++){
%>
<li class='listItem'>
	<a href="#" class='cityLink'><%=$data[i].cityName%></a>
	<ul>
	<%
		for(var j = 0;j<$data[i].areaName.length;j++){
	%>
		<li><a href="#" class="areaLink"><%=$data[i].areaName[j]%></a></li>
	<%
		}
	%>
	</ul>
</li>
<%
	}
%>