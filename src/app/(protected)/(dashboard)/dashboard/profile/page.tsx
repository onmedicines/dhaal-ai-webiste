"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Calendar,
  Shield,
  Activity,
  Eye,
  EyeOff,
  Save,
  Edit3,
  Lock,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useUser } from "@/hooks/useUser";

interface ProfileData {
  id: string;
  name: string;
  email: string;
  role: "individual" | "business";
  isActive: boolean;
  lastLogin: string | null;
  detectionsCount: number;
  createdAt: string;
  updatedAt: string;
}

interface PasswordChangeData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ProfilePage() {
  const user = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [editedName, setEditedName] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [passwordData, setPasswordData] = useState<PasswordChangeData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setProfileData(user);
      setEditedName(user.name);
    }
  }, [user]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleUpdateProfile = async () => {
    if (!editedName.trim()) {
      setError("Name cannot be empty");
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name: editedName.trim(),
          }),
        },
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setProfileData((prev) =>
          prev
            ? {
                ...prev,
                name: data.data.user.name,
                updatedAt: data.data.user.updatedAt,
              }
            : null,
        );
        setIsEditing(false);
        setSuccess("Profile updated successfully!");

        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(data.message || "Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      setError("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (
      !passwordData.currentPassword ||
      !passwordData.newPassword ||
      !passwordData.confirmPassword
    ) {
      setError("Please fill in all password fields");
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setError("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setError("New password must be at least 6 characters long");
      return;
    }

    setPasswordLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/change-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            currentPassword: passwordData.currentPassword,
            newPassword: passwordData.newPassword,
          }),
        },
      );

      const data = await response.json();

      if (response.ok && data.success) {
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setIsChangingPassword(false);
        setSuccess("Password changed successfully!");

        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(null), 3000);
      } else {
        setError(data.message || "Failed to change password");
      }
    } catch (error) {
      console.error(error);
      setError("Network error. Please try again.");
    } finally {
      setPasswordLoading(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedName(profileData?.name || "");
    setError(null);
  };

  const handleCancelPasswordChange = () => {
    setIsChangingPassword(false);
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setError(null);
  };

  if (!profileData) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Profile Settings</h1>
        <p className="text-muted-foreground">
          Manage your account information and preferences
        </p>
      </div>

      {/* Success/Error Messages */}
      {success && (
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-600" />
          <p className="text-green-800">{success}</p>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-600" />
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <User className="h-5 w-5" />
                Basic Information
              </CardTitle>
              {!isEditing && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsEditing(true)}
                  className="gap-2"
                >
                  <Edit3 className="h-4 w-4" />
                  Edit
                </Button>
              )}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                {isEditing ? (
                  <Input
                    id="name"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    placeholder="Enter your full name"
                  />
                ) : (
                  <p className="text-foreground font-medium">
                    {profileData.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label>Email Address</Label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <p className="text-foreground">{profileData.email}</p>
                </div>
                <p className="text-xs text-muted-foreground">
                  Email cannot be changed. Contact support if needed.
                </p>
              </div>

              {isEditing && (
                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={handleUpdateProfile}
                    disabled={isLoading}
                    className="gap-2"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4" />
                    )}
                    Save Changes
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancelEdit}
                    disabled={isLoading}
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Password Change Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Security
              </CardTitle>
              {!isChangingPassword && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsChangingPassword(true)}
                  className="gap-2"
                >
                  <Lock className="h-4 w-4" />
                  Change Password
                </Button>
              )}
            </CardHeader>
            <CardContent>
              {isChangingPassword ? (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">Current Password</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showCurrentPassword ? "text" : "password"}
                        value={passwordData.currentPassword}
                        onChange={(e) =>
                          setPasswordData((prev) => ({
                            ...prev,
                            currentPassword: e.target.value,
                          }))
                        }
                        placeholder="Enter current password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() =>
                          setShowCurrentPassword(!showCurrentPassword)
                        }
                      >
                        {showCurrentPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        value={passwordData.newPassword}
                        onChange={(e) =>
                          setPasswordData((prev) => ({
                            ...prev,
                            newPassword: e.target.value,
                          }))
                        }
                        placeholder="Enter new password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">
                      Confirm New Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={passwordData.confirmPassword}
                        onChange={(e) =>
                          setPasswordData((prev) => ({
                            ...prev,
                            confirmPassword: e.target.value,
                          }))
                        }
                        placeholder="Confirm new password"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Password must be at least 6 characters long.
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button
                      onClick={handleChangePassword}
                      disabled={passwordLoading}
                      className="gap-2"
                    >
                      {passwordLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Save className="h-4 w-4" />
                      )}
                      Change Password
                    </Button>
                    <Button
                      variant="outline"
                      onClick={handleCancelPasswordChange}
                      disabled={passwordLoading}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Your password was last updated on{" "}
                  {formatDate(profileData.updatedAt)}.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Account Information Sidebar */}
        <div className="space-y-6">
          {/* Account Status */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Account Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Status</span>
                <Badge
                  variant={profileData.isActive ? "default" : "destructive"}
                >
                  {profileData.isActive ? "Active" : "Inactive"}
                </Badge>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Role</span>
                <Badge variant="outline" className="capitalize">
                  {profileData.role}
                </Badge>
              </div>

              <Separator />

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Activity</span>
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>
                    Detections:{" "}
                    <span className="font-medium text-foreground">
                      {profileData.detectionsCount}
                    </span>
                  </p>
                  <p>
                    Last login:{" "}
                    {profileData.lastLogin
                      ? formatDate(profileData.lastLogin)
                      : "Never"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Account Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">Member since</p>
                <p className="text-sm font-medium">
                  {formatDate(profileData.createdAt)}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">Last updated</p>
                <p className="text-sm font-medium">
                  {formatDate(profileData.updatedAt)}
                </p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">User ID</p>
                <p className="text-xs font-mono bg-muted px-2 py-1 rounded">
                  {profileData.id}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
