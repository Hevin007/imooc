$(function() {
	$('.comment').click(function(e) {
		//评论隐藏域
		var target = $(this);
		var toId = target.data('tid');
		var commentId = target.data('cid');

		if($('#toId').length > 0) {
			$('#toId').val(toId)
		}else {
			$('<input>').attr({
				type: 'hidden',
				id: 'toId',
				name: 'comment[tid]',
				value: toId
			}).appendTo('#commentForm');
		}

		if($('#commentId').length > 0) {
			$('#commentId').val(commentId)
		}else {
			$('<input>').attr({
				type: 'hidden',
				id: 'commentId',
				name: 'comment[cid]',
				value: commentId
			}).appendTo('#commentForm');
		}

		//输入框显示提示文字
		var toName = target.data('tname');
		$('.replyText').attr("placeholder","回复"+toName+":")
	})
})