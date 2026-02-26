from rest_framework import serializers
from .models import User


class RegisterSerializer(serializers.ModelSerializer):

    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            'email',
            'password',
            'confirm_password',
            'role',
            'full_name',
            'phone',
            'dealership_name',
            'contact_name',
            'admin_code',
        ]
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, data):

        # Password match check
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")

        role = data.get('role')

        # Role-based validation
        if role == 'customer':
            if not data.get('full_name'):
                raise serializers.ValidationError("Full name is required for customers.")

        if role == 'dealer':
            if not data.get('dealership_name'):
                raise serializers.ValidationError("Dealership name is required for dealers.")
            if not data.get('contact_name'):
                raise serializers.ValidationError("Contact name is required for dealers.")

        if role == 'admin':
            if data.get('admin_code') != "MSITIRI2026":
                raise serializers.ValidationError("Invalid admin code.")

        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')

        password = validated_data.pop('password')

        user = User.objects.create_user(
            password=password,
            **validated_data
        )

        return user