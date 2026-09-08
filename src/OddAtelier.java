
    /* Functional Requirements
Display Menu: Show 5 drinks with their 3 size prices
Select Drink: Customer chooses by number (1-5)
Select Size: Customer chooses size (1=small, 2=regular, 3=large)
Select Customer Type: Choose from 4 types with different discounts
Select Add-ons: Customer can choose multiple add-ons (0 or more)
Order Summary: Display complete order with subtotal, discount, and total
Loop: Allow multiple orders in one session
*/

import java.util.Scanner;
public class OddAtelier {
  public static void main(String[] args) {
  Scanner scanner = new Scanner(System.in);

//Step 1: Set Up the Menu Data //
//Menu Items//
String[] menuItems = {
    "Matcha Strawberry",
    "Spanish Latte", 
    "Caramel Macchiato",
    "Iced Americano",
    "Hot Chocolate"
};
//Menu Prices//
int [][] menuPrices = {
    {110, 120, 135},
    {115, 125, 140},
    {115, 125, 135},
    {120, 130, 145},
    {90, 110, 125}
  };

//Menu Sizes//
String[] menuSizes = {"Small", "Medium", "Large"};

//Add-on Items//
String[] addOnItems = {
    "Extra Espresso Shot", 
    "Soy Milk", 
    "Oat Milk", 
    "Whipped Cream", 
    "Caramel Syrup"
};

//Add-on Prices//
int[] addOnPrices = {20, 15, 15, 13, 15};

//Customer Types and Discounts//
String[] customerTypes = {"Regular", "Student", "Senior Citizen", "VIP"};
double[] customerDiscounts = {0.0, 0.05, 0.10, 0.15};

//variable to control the loop for multiple orders//
//boolean anotherOrder = true;
boolean anotherOrder = true;

//main loop for multiple orders, runs until the user decides to stop ordering//
while (anotherOrder) {

//Step 2: Display the Main Menu //
    System.out.println("=".repeat(40));
    System.out.println("======Welcome to Odd Atelier Cafe!======");
    System.out.println("=".repeat(40));

    System.out.println("Choose your order from the menu below.");

    for (int i = 0; i < menuItems.length; i++) {
        System.out.printf("%d. %-18s | Small: Php %d | Regular: Php %d | Large: Php %d%n",
                    (i + 1), 
                    menuItems[i], 
                    menuPrices[i][0],  // small price
                    menuPrices[i][1],  // regular price
                    menuPrices[i][2]   // large price
                );
    }
        System.out.println("=".repeat(40));

//Step 3: Get Drink Choice//
    int drinkChoice = 0;
    boolean validDrinkChoice = false;
    // WHILE LOOP: Keep asking until user enters a valid choice (1-5)
        while (!validDrinkChoice) {
            System.out.print("Please enter your order of choice (1-5):");
            drinkChoice = scanner.nextInt();

            // IF-ELSE: Check if choice is valid
            if (drinkChoice >=1 && drinkChoice <=5) {
                validDrinkChoice = true; //exits the loop
            } else {
                System.out.println("Invalid choice. Please enter numbers from 1-5 only.");
            }
        }

//Step 4: Get Size Choice//
    int sizeChoice = 0;
    boolean validSizeChoice = false;
        while (!validSizeChoice) {
	        System.out.print("Please enter your drink sizes | Small(1) | Regular(2) | Large(3): ");
	        sizeChoice = scanner.nextInt();
    if (sizeChoice >= 1 && sizeChoice <= 3) {
	    validSizeChoice = true;	//to exit the loop if valid input
        } else {
	        System.out.println("Invalid input. Please choose numbers between 1-3 only.");
    }
}

//Step 5: Get Customer Type//
    System.out.println("\n" + "=".repeat(40));
    System.out.println("Please select your customer type to avail your discount.");
    System.out.println("=".repeat(40));
    int customerTypeChoice = 0;
    boolean validCustomerTypeChoice = false;
	while (!validCustomerTypeChoice) {
        System.out.println("1 Regular (0% discount)");
        System.out.println("2 Student (5% discount)");
        System.out.println("3 Senior Citizen (10% discount)");
        System.out.println("4 VIP (15% discount)");
        System.out.println("=".repeat(40));
        System.out.print("Your customer type:");
        customerTypeChoice = scanner.nextInt();

        if (customerTypeChoice >= 1 && customerTypeChoice <= 4) {
			validCustomerTypeChoice = true;
		} else {
			System.out.print("Invalid type of choice. Please enter numbers from 1-4 only.");
		}
	}

//Step 6: Handle Add-ons//
int drinkIndex = drinkChoice - 1; // Adjust for 0-based index
int sizeIndex = sizeChoice - 1; // Adjust for 0-based index

int drinkPrice = menuPrices[drinkIndex][sizeIndex]; // Get the price of the selected drink and size
int addOnTotal = 0; // Initialize add-on total
String addOnOrdered = ""; // Initialize ordered add-ons string

 // FOR LOOP: Display all add-ons with their numbers
System.out.println("\n" +"=".repeat(40));
System.out.println("           Add-Ons (Optional)           ");
System.out.println("Please select your add-ons from the choices below");
System.out.println("=".repeat(40));
    for (int i = 0; i < addOnItems.length; i++) {
        System.out.printf("%s.%-18s | Php %d%n",
        (i + 1),
        addOnItems[i],
        addOnPrices[i]
    );
}

//nested loop to let user add multiple add-ons//
boolean addMoreAddOns = true;
    while (addMoreAddOns){
        System.out.println("=".repeat(40));
        System.out.print("Enter the number of add-on you want to add (1-5) or 0 to cancel: ");
        int addOnChoice = scanner.nextInt();


        if (addOnChoice == 0) {
            addMoreAddOns = false; //exit the loop if user chooses 0
        } else if (addOnChoice >= 1 && addOnChoice <= 5) {
            int addOnIndex = addOnChoice - 1; // Adjust for 0-based index
            addOnTotal += addOnPrices[addOnIndex];

        // Add to the ordered add-ons string (for display)
        if (addOnOrdered.isEmpty()) {
            addOnOrdered += addOnItems[addOnIndex];
        } else {
            addOnOrdered += ", " + addOnItems[addOnIndex];
        } 

        System.out.println("");
        System.out.printf("Added: %s (+Php %d)%n", 
                addOnItems[addOnIndex], 
                addOnPrices[addOnIndex]
                );
            } else {
                System.out.println("Invalid! Enter 1-5 or 0 to finish.");
        }
    }

//Step 7: Calculate Total//
double subtotal = drinkPrice + addOnTotal;

int customerIndex = customerTypeChoice - 1; // Adjust for 0-based index
double discountRate = customerDiscounts[customerIndex]; 
double discountAmount = subtotal * discountRate;
double finalTotal = subtotal - discountAmount;

System.out.println("\n" + "=".repeat(40));
System.out.println("=============Order Summary==============");
System.out.println("=".repeat(40));
System.out.println("Your Order/s: " + menuItems[drinkIndex] + "(" + menuSizes[sizeIndex] +")");
System.out.println("Total: Php " + drinkPrice);

// IF-ELSE: Check if any add-ons were ordered
if (!addOnOrdered.isEmpty()) {
    System.out.println("Add-on: " + addOnOrdered);
    System.out.println("Add-onTotal: " + addOnTotal);
} else {
    System.out.println("No add-ons ordered.");
}

 System.out.printf("Subtotal: Php %.2f%n", subtotal);
            System.out.printf("Discount (%s): -Php %.2f%n", 
                customerTypes[customerIndex], 
                discountAmount
            );

//Step 8: Display Summary//
System.out.println("=".repeat(40));
            System.out.printf("TOTAL AMOUNT: Php %.2f%n", finalTotal);
            System.out.println("=========================================");
            System.out.println("Thank you for ordering!");

//Step 9: Ask for Another Order//
boolean validOrderAgain = false;
        while (!validOrderAgain){
            System.out.println("\nWould you like to place another order? (Y/N?)");
            String orderAgain = scanner.next();
                if (orderAgain.equalsIgnoreCase("Y")) {
                    validOrderAgain = true;
                    // continueOrdering stays TRUE, so the main loop repeats
                    System.out.println("\nStarting new order...");
                    System.out.println("=".repeat(40) + "\n");
                } 
                // Check if user wants to exit
                else if (orderAgain.equalsIgnoreCase("N")) {
                    validOrderAgain = true;
                    anotherOrder = false;  // This exits the main while loop
                    System.out.println("\nThank you for visiting Odd Atelier Cafe! Have a great day!");
                    break;
                } 
                // Invalid input - ask again
                else {
                    System.out.println("Invalid input! Please enter Y or N.");
                    // validOrderAgain stays FALSE, so the inner while loop continues
                }
            }
        }
scanner.close();
  }
}
