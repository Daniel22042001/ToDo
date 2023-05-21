<?php
header("Access-Control-Allow-Origin:*");


$dsn = "mysql:host=localhost;dbname=todo";
$username = "root";
$password = "admin";


try{
    $connection = new PDO($dsn, $username, $password );
}catch(Exception $exception){
    print_r($exception); 

}

$content = file_get_contents("php://input");
$task = json_decode($content);

$name = $task->name;
$description = $task->description;
$date = $task->date;
 


$sqlQuery = "INSERT INTO tasks (name, description, date)
    VALUES('$name', '$description', '$date' )";


$result = $connection->query($sqlQuery);

if ($result){
    echo "el registro se guardo corecctamente";
}else{
    echo "el registro no se guardo corecctamente";

}

