package com.example.barbershopapp.ui.screens

import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.foundation.layout.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.compose.rememberNavController
import com.example.barbershopapp.ui.screens.CalendarScreen

@Composable
fun ClientHomeScreen() {
    val navController = rememberNavController()
    val items = listOf(
        ClientNavItem.Services,
        ClientNavItem.Barbers,
        ClientNavItem.Appointments,
        ClientNavItem.Products,
        ClientNavItem.Profile
    )
    Scaffold(
        bottomBar = {
            NavigationBar {
                val currentRoute = navController.currentBackStackEntryAsState().value?.destination?.route
                items.forEach { item ->
                    NavigationBarItem(
                        selected = currentRoute == item.route,
                        onClick = { navController.navigate(item.route) },
                        label = { Text(item.label) },
                        icon = { Icon(item.icon, contentDescription = item.label) },
                        colors = NavigationBarItemDefaults.colors(
                            selectedIconColor = MaterialTheme.colorScheme.primary,
                            unselectedIconColor = MaterialTheme.colorScheme.onSurfaceVariant,
                            selectedTextColor = MaterialTheme.colorScheme.primary,
                            unselectedTextColor = MaterialTheme.colorScheme.onSurfaceVariant,
                            indicatorColor = MaterialTheme.colorScheme.primary.copy(alpha = 0.15f)
                        )
                    )
                }
            }
        }
    ) { innerPadding ->
        NavHost(
            navController = navController,
            startDestination = ClientNavItem.Services.route,
            modifier = Modifier.padding(innerPadding)
        ) {
            composable(ClientNavItem.Services.route) { ServicesScreen() }
            composable(ClientNavItem.Services.route) {
                ServicesScreen(navController)
            }
            composable(ClientNavItem.Barbers.route) { BarbersScreen() }
            composable(ClientNavItem.Appointments.route) { AppointmentsScreen() }
            composable(ClientNavItem.Products.route) { ProductsScreen() }
            composable(ClientNavItem.Profile.route) { ProfileScreen() }
            composable("calendar/{serviceId}") { backStackEntry ->
                CalendarScreen(backStackEntry.arguments?.getString("serviceId"))
            }
        }
    }
}