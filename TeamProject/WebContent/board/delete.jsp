<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="ko">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Insert title here</title>
<script type="text/javascript" src="http://code.jquery.com/jquery.js"></script>
<script type="text/javascript">
$(function(){

	// 비번 입력 안 한 경우 수정완료버튼 비활성화 
	var pwdInput=$('#pwd').val();
	if(pwdInput.trim()==''){
		$('#deleteBtn').attr('disabled', true);
		$('#pwd_check_result').html("<span style=\"color:#ff3a6d;\">비밀번호를 입력해주세요.</font>");
	}
	else{
		$('#deleteBtn').attr('disabled', false);
	}

	// 비번 입력 시 비번이 맞는지 체크
	$('#pwd').keyup(function(){
		var user_input_pwd=$(this).val();
		console.log(user_input_pwd);
		var bno=$('#bno').val();

		$.ajax({
			type:'POST',
			url:'../board/pwd_check.do',
			data:{"pwd":user_input_pwd,"bno":bno}, 
			success:function(result)
			{
				var pwdCheck=result.trim();
				if(pwdCheck=="true"){
					$('#pwd_check_result').html("<span style=\"color: #1976D2;\">비밀번호가 맞습니다. 수정할 수 있습니다.</font>");
					$('#deleteBtn').attr('disabled', false);
				}
				else{
					$('#pwd_check_result').html("<span style=\"color:#ff3a6d;\">비밀번호가 틀립니다.</font>");
					$('#deleteBtn').attr('disabled', true);
				}
			},
			error:function(e){
				alert(e);
			}
		})
	});
	
	
});
</script>
</head>
<body>
	<section class="board-block light-bg">
        <div class="container py-5">
        	<div class="deleteArea">
	        	<div class="row">
	                <div class="col-md-6">
	                    <h5>글 삭제</h5>
	                </div>
	            </div>
				<div class="py-3">
						<form method="post" action="../board/delete_ok.do">
							 <div class="table-responsive">
								<table class="table replyBoard reply_insert">
								<tbody>
									<input type="hidden" name="bno" id="bno" value=${bno }>
									<tr>
										<th class="text-right success">비밀번호</th>
										<td>
											<input type="password" name="pwd" id="pwd" required value="">
											<div id="pwd_check_result" class="mt-2"></div>
										</td>
									</tr>
								</tbody>
								</table>
							 </div>
							 <div class="board-btn-wrap">
							 	<input type="button" value="취소" class="btn btn-cancle" onclick="javascript:history.back()">
								<input type="submit" value="삭제" class="btn btn-danger" id="deleteBtn">		
							 </div>
						</form>
				</div>
        	</div>
			
		</div>
    </section>
</body>
</html>