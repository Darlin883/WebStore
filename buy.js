
function add(button){
    const shopItem = button.parentElement.parentElement; 
    const title = shopItem.querySelector(".shop-item-title").innerText;//takes theyre css file with queryselector
    const price = shopItem.querySelector(".shop-item-price").innerText;
    const imageSrc = shopItem.querySelector(".shop-item-image").src;

    addItemToCart(title, price, imageSrc);
}

function addItemToCart(title, price, imageSrc){
    let cartItems = document.querySelector(".cart-items");// grabbing the class
    let cartItemNames = cartItems.getElementsByClassName("cart-item-title");

    for(let i = 0; i < cartItemNames.length; i++){
        if(cartItemNames[i].innerText == title){ // goes through all the cart item names
            alert("you already have this in the cart");//alert pops up like a prompt
            return;
        }
    }

    let cartRow = document.createElement("div");// this whole thing makes the cart row 
    cartRow.classList.add("cart-row");
    let cartRowContent = `
    <div class="cart-item cart-column">
            <img class="cart-item-image" src="${imageSrc}" width="100" height="100">
            <span class="cart-item-title">${title}</span>
        </div>
        <span class="cart-price cart-column">${price}</span>
        <div class="cart-quantity cart-column">
            <input class="cart-quantity-input" type="number" value="1">
            <button class="btn btn-danger" type="button">REMOVE</button>
        </div>
    `;
    cartRow.innerHTML = cartRowContent;
    cartItems.append(cartRow);// addubg the cart rows created

    var removeBtn = cartRow.querySelector(".btn-danger");// remove
    removeBtn.addEventListener("click", function(){
        removeItemRow(cartRow);
    });

    var quantity = cartRow.querySelector(".cart-quantity-input")// getting quantity
    quantity.addEventListener("change", function(){
        if(quantity <= 0){
            quantityInput.value <= 1; //mkaing sure quantity is at least 1
        }
        updateCartTotal();// update quantity when it changes
    });
   updateCartTotal();// update automatically when item is added
}

function updatePrice(cartRow, quantity){
    let price = cartRow.querySelector(".cart-price").innerText;
    let totalPrice = price * quantity;
    cartRow.querySelector(".cart-price").innerText = totalPrice.toFixed(2);//converts number to string
    updateCartTotal();
}

function updateCartTotal(){
    let total = 0;// starting 0
    let cartItems = document.querySelector(".cart-items");//getting cart-items and cart-row with queryselector
    let cartRow = cartItems.querySelectorAll(".cart-row");

    cartRow.forEach(function(cartRow){
        let price = parseFloat(cartRow.querySelector(".cart-price").innerText.replace("$", ""));//converting string to a num
        let quantityElement = cartRow.querySelector(".cart-quantity-input")
        let quantity = quantityElement.value;
        total += price * quantity; //adds up price && multipliy price by quantity
    });
    document.querySelector(".cart-total-price").innerText = `$${total.toFixed(2)}`;
}

function removeItemRow(cartRow){// remove method
    cartRow.remove();
    updateCartTotal();// updating cart total
}
function purchase(){
    let cartItems = document.querySelector(".cart-items");

    while(cartItems.firstChild){// this loop will keep running as long as there is at least one child
        cartItems.removeChild(cartItems.firstChild)
        
    }
    updateCartTotal();
    alert("Thank you for you're purchase");
}

function Store(){
    //                                       parent container        
    var shopItems = document.querySelectorAll(".shop-items");
    //The querySelector() method returns the first element that matches a CSS selector.
    shopItems.forEach(function(shopItem){
        var buttons = shopItem.querySelectorAll(".shop-item-button")
        buttons.forEach(function(button){
            button.addEventListener("click", function(){
                add(button);
            });
        });
    });

    var purchaseBtn = document.querySelector(".btn-purchase");
    if(purchaseBtn){
    purchaseBtn.addEventListener("click", function(){// eventlisteners wait for you to click and excutes whatever is next
        purchase();
    });
}
}

Store();