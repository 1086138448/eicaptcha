/*
* 2007-2014 PrestaShop
*
* NOTICE OF LICENSE
*
* This source file is subject to the Academic Free License (AFL 3.0)
* that is bundled with this package in the file LICENSE.txt.
* It is also available through the world-wide-web at this URL:
* http://opensource.org/licenses/afl-3.0.php
* If you did not receive a copy of the license and are unable to
* obtain it through the world-wide-web, please send an email
* to license@prestashop.com so we can send you a copy immediately.
*
* DISCLAIMER
*
* Do not edit or add to this file if you wish to upgrade PrestaShop to newer
* versions in the future. If you wish to customize PrestaShop for your
* needs please refer to http://www.prestashop.com for more information.
*
*  @author PrestaShop SA <contact@prestashop.com>
*  @copyright  2007-2014 PrestaShop SA
*  @license    http://opensource.org/licenses/afl-3.0.php  Academic Free License (AFL 3.0)
*  International Registered Trademark & Property of PrestaShop SA
*/
$(document).ready(function(){
    
    //Append a div at end of the form to hold the captcha
    $('#send_friend_form_content .form_container')
            .after('<div class="captcha-content"><label for="captcha">Captcha</label><div id="recaptchaSendToAFriend"></div>');
    
	if (!!$.prototype.fancybox)
		$('#send_friend_button').fancybox({
			'hideOnContentClick': false
		});

	$('#send_friend_form_content .closefb').click(function(e) {
		$.fancybox.close();
		e.preventDefault();
	});

	$('#sendEmail').click(function(){
		var name = $('#friend_name').val();
		var email = $('#friend_email').val();
                
                //Vérification ajax du captcha
                 if (!grecaptcha.getResponse()) {
                    $.ajax({
                        method: "POST",
                        url: checkCaptchaUrl,
                        data: "action=display_captcha_error",
                        success: function (msg) {
                            $("#send_friend_form_error").html("").html(msg);
                        }
                        });

                    return false;
                } 
		if (name && email && !isNaN(id_product))
		{
			$.ajax({
                                //replace module original link by eicaptcha link
				url: checkCaptchaUrl+'?rand=' + new Date().getTime(),
				type: "POST",
				headers: {"cache-control": "no-cache"},
				data: {
					action: 'sendToMyFriend', 
					secure_key: stf_secure_key,
					name: name, 
					email: email, 
					id_product: id_product,
                                        'g-recaptcha-response': $('#g-recaptcha-response').val()
				},
				dataType: "json",
				success: function(result) {
					$.fancybox.close();
					fancyMsgBox((result ? stf_msg_success : stf_msg_error), stf_msg_title);
				}
			});
		}
		else
			$('#send_friend_form_error').text(stf_msg_required);
	});
});