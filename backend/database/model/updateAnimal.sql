UPDATE animals
SET name = $name,
    type = $type,
    birthDate = $birthDate,
    breedComposition = $breedComposition,
    fatherID = $fatherID,
    motherID = $motherID,
    colorID = $colorID,
    currentWeight = $currentWeight
WHERE animalID = $animalID;

