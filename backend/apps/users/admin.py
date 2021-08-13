from .models import User
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin


class UserAdminConfig(UserAdmin):
    model = User
    search_fields = ('email', 'first_name',)
    list_filter = ('email', 'is_active', 'is_staff')
    ordering = ('email',)
    list_display = ('email', 'id', 'is_active', 'is_staff')
    fieldsets = (
        (None, {'fields': ('password', 'email')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
        ('Personal', {'fields': ('about',)}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'is_active', 'is_staff')}
         ),
    )


admin.site.register(User, UserAdminConfig)
