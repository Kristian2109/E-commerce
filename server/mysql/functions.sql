-- Function 1

FUNCTION getQuantityOfProduct(productId INT) RETURNS int
    DETERMINISTIC
RETURN (select in_stock from products where id = productId)


/*Function 2
Decreases the count of the products in stock 
for a particular product with the given amount
Returns true or false depending if this is possible. */

CREATE FUNCTION takeProducts(quantity INT, productId INT)
RETURNS BOOL DETERMINISTIC
BEGIN
  DECLARE quantityOfProduct int;
    
  SET quantityOfProduct := getQuantityOfProduct(productId);
  
  IF quantityOfProduct < quantity THEN
    RETURN FALSE;
    END IF;
  
  UPDATE products 
  SET 
      in_stock = quantityOfProduct - quantity
  WHERE
      id = productId;
  
  RETURN TRUE;
END $$