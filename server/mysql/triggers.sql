CREATE TRIGGER takeProducts BEFORE INSERT  
ON order_items FOR EACH ROW  
BEGIN  
	DECLARE result BOOL;
    SET result := takeProducts(NEW.quantity, NEW.product_id);
    
    if result = false Then SIGNAL SQLSTATE '45000'; END IF;
END $$