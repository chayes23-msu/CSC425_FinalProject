UPDATE animals
SET name = $name,
    type = $type,
    birthDate = $birthDate,
    breedComposition = $breedComposition,
    age =  $age,
    fatherID = $fatherID,
    motherID = $motherID,
    colorID = $colorID
WHERE animalID = $animalID;

