UPDATE NotebookEntries
SET 
    content = $content
    userID = $userID
    weight = $weight
    modifiedDate = CURRENT_TIMESTAMP
WHERE 
    entryID = $entryID
;