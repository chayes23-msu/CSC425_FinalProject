UPDATE Animals
SET name = $name,
    type = $type,
    birthDate = $birthDate,
    breedComposition = $breedComposition,
    fatherID = $fatherID,
    motherID = $motherID,
    colorID = $colorID,
    tagNumber = $tagNumber,
    currentWeight = $currentWeight
WHERE animalID = $animalID;

