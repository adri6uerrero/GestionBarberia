package com.example.barbershopapp.ui.screens

import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.*
import androidx.compose.ui.graphics.vector.ImageVector

sealed class ClientNavItem(val route: String, val label: String, val icon: ImageVector) {
    object Services : ClientNavItem("services", "Servicios", Icons.Default.ContentCut)
    object Barbers : ClientNavItem("barbers", "Barberos", Icons.Default.Person)
    object Appointments : ClientNavItem("appointments", "Citas", Icons.Default.Event)
    object Products : ClientNavItem("products", "Productos", Icons.Default.ShoppingCart)
    object Profile : ClientNavItem("profile", "Perfil", Icons.Default.AccountCircle)
}