UPDATE NotebookEntries
SET 
    content = $content
WHERE 
    animalID = $animalID AND
    userID = $userID
;