UPDATE Animals
SET name = $name,
    type = $type,
    birthDate = $birthDate,
    breedComposition = $breedComposition,
    fatherID = $fatherID,
    motherID = $motherID,
    colorID = $colorID,
    currentWeight = $currentWeight,
    tagNumber = $tagNumber,
    dateOfSale = $dateOfSale,
    pricePerPound = $pricePerPound,
    totalPrice = $totalPrice
WHERE animalID = $animalID;

