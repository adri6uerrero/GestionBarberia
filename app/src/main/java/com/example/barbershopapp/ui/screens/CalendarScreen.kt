package com.example.barbershopapp.ui.screens

import androidx.compose.foundation.layout.*
import androidx.compose.material3.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier

@Composable
fun CalendarScreen(serviceId: String?) {
    Box(
        Modifier.fillMaxSize(),
        contentAlignment = Alignment.Center
    ) {
        Text("Aquí irá el calendario para el servicio ID: $serviceId", style = MaterialTheme.typography.titleLarge)
    }
}