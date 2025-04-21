package com.example.barbershopapp.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier

@Composable
fun ServicesScreen() {
    Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
        Text("Servicios", style = MaterialTheme.typography.titleLarge)
    }
}

@Composable
fun BarbersScreen() {
    Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
        Text("Barberos", style = MaterialTheme.typography.titleLarge)
    }
}

@Composable
fun AppointmentsScreen() {
    Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
        Text("Citas", style = MaterialTheme.typography.titleLarge)
    }
}

@Composable
fun ProductsScreen() {
    Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
        Text("Productos", style = MaterialTheme.typography.titleLarge)
    }
}

@Composable
fun ProfileScreen() {
    Box(Modifier.fillMaxSize(), contentAlignment = Alignment.Center) {
        Text("Perfil", style = MaterialTheme.typography.titleLarge)
    }
}