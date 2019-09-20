$(document).ready(function(){
    var newRowId=2,previousRowId;
    var productQty,productPrice;
    var productTotalAmt;
        
    $(".addRow").click(function(){
        previousRowId=newRowId-1;
        $('#tableRow'+newRowId).html($('#tableRow'+previousRowId).html()).find("td:first-child").html(newRowId);
        $('.tableProduct').append('<tr id="tableRow'+(newRowId+1)+'"></tr>'); //creating Dummy Row
          newRowId++;
    });

    $(".tableProduct").on('click', '.deleteRow', function () {
        if(newRowId>2){
            $(this).closest('tr').remove();
            var rowId=0;
            $("tr").each(function(){
                $(this).attr("id","tableRow"+rowId).find("td:first-child").html(rowId);
            rowId++;
            });
            newRowId=$('.tableProduct tbody tr').length;
            grandTotal();
        }
    });
    $('.tableProduct').on('keyup change', '.inputData', function(){
        var currentRow=$(this).closest('tr'); 
        var productQty=$(currentRow).find(".productQty").val();
        var productPrice=$(currentRow).closest('tr').find(".productPrice").val();
        $(this).closest('tr').find(".totalAmt").val(productQty*productPrice);
        grandTotal();
    });
    function grandTotal(){
    var subTotal=0,taxAmount=0;
    $(".totalAmt").each(function(){
        subTotal+=parseInt($(this).val());
    });
    $("#subTotal").val(subTotal);
    $('.taxPercentage').each(function(){
        var taxPercentage=$(this).val();
        var totalAmount=$(this).closest('tr').find(".totalAmt").val();
        taxAmount+=(totalAmount/100)*taxPercentage;
        });
    $('.taxAmt').val(taxAmount);
    $('.grandTotal').val((subTotal+taxAmount));
}
});
