<?php
//Vars
$firstName = $_POST['firstName'];
$lastName = $_POST['lastName'];
$userName = $_POST['userName'];
$password = $_POST['password'];

//Connection to database
$connection = new mysqli('localhost', 'root', 'test');
if($connection->connect_error)
{
	die('Connection Failed : '.$connection->connect_error);
}
else
{
	$stmt = $connection->prepare("insert(firstName, lastName, userName, password) 
	values(?, ?, ?, ?)");
	
	//Pass values for binding
	$stmt->bind_param("ssss", $firstName, $lastName, $userName, $password); 
	
	$stmt->execute();
	echo "Successfully created user";
	$stmt->close();
	$connection->close();
}
?>