
function Store(){
    //                     parent container          check if it has shop item button
    document.querySelector(".shop-items").addEventListener("click", collect);
    //The querySelector() method returns the first element that matches a CSS selector.
    function collect(event){
        if(event.target.classList.contains("shop-item-button")){
            add(event.target);
        }
    }
function remove(this){
    
}
function add(this){
    


}
function purchase(){

}
}