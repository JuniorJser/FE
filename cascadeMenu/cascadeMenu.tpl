<div class="cascadeBlock">
	<div class="cascadePart">
		<span></span>
		<ul class="mainMenu">
		<%
		for(var i=0;i<$data.length;i++){
		%>
			<li dataid=<%=i%>><%=$data[i].areaName%></li>
		<%
		}
		%>
		</ul>
	</div>
	<div class="cascadePart">
		<span></span>
		<ul class="subMenu">
		</ul>
	</div>
</div>