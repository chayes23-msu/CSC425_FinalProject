UPDATE Users
SET 
    username = $username
WHERE  
    userID = $userID;