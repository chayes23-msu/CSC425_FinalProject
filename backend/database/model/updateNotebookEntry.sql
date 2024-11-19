UPDATE NotebookEntries
SET 
    content = $content,
    userID = $userID,
    weight = $weight,
    modifiedAt = CURRENT_TIMESTAMP
WHERE 
    entryID = $entryID
;