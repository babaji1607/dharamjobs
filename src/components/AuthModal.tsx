"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { signIn, signUp } from "@/lib/auth-client";
import { useToast } from "@/hooks/use-toast";

interface AuthModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    defaultTab?: "login" | "register";
}

export function AuthModal({ open, onOpenChange, defaultTab = "login" }: AuthModalProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        try {
            const result = await signIn.email({
                email,
                password,
            });

            if (result.error) {
                toast({
                    title: "Error",
                    description: result.error.message || "Invalid credentials",
                    variant: "destructive",
                });
            } else {
                toast({
                    title: "Success",
                    description: "Logged in successfully!",
                });
                onOpenChange(false);
                window.location.reload();
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const confirmPassword = formData.get("confirmPassword") as string;
        const phone = formData.get("phone") as string;

        if (password !== confirmPassword) {
            toast({
                title: "Error",
                description: "Passwords do not match",
                variant: "destructive",
            });
            setIsLoading(false);
            return;
        }

        try {
            const result = await signUp.email({
                email,
                password,
                name,
                callbackURL: "/",
            });

            if (result.error) {
                toast({
                    title: "Error",
                    description: result.error.message || "Registration failed",
                    variant: "destructive",
                });
            } else {
                // Update user with phone number if provided
                if (phone) {
                    // You can create an API endpoint to update user info
                    await fetch("/api/user/update", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ phone }),
                    });
                }

                toast({
                    title: "Success",
                    description: "Account created successfully!",
                });
                onOpenChange(false);
                window.location.reload();
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Welcome to DharmicJobs</DialogTitle>
                    <DialogDescription>
                        Login or create an account to apply for jobs or post opportunities
                    </DialogDescription>
                </DialogHeader>

                <Tabs defaultValue={defaultTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="login">Login</TabsTrigger>
                        <TabsTrigger value="register">Register</TabsTrigger>
                    </TabsList>

                    <TabsContent value="login">
                        <form onSubmit={handleLogin} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="login-email">Email</Label>
                                <Input
                                    id="login-email"
                                    name="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    required
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="login-password">Password</Label>
                                <Input
                                    id="login-password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    disabled={isLoading}
                                />
                            </div>

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Logging in..." : "Login"}
                            </Button>
                        </form>
                    </TabsContent>

                    <TabsContent value="register">
                        <form onSubmit={handleRegister} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="register-name">Full Name</Label>
                                <Input
                                    id="register-name"
                                    name="name"
                                    type="text"
                                    placeholder="John Doe"
                                    required
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="register-email">Email</Label>
                                <Input
                                    id="register-email"
                                    name="email"
                                    type="email"
                                    placeholder="your@email.com"
                                    required
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="register-phone">Phone Number (Optional)</Label>
                                <Input
                                    id="register-phone"
                                    name="phone"
                                    type="tel"
                                    placeholder="+91 1234567890"
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="register-password">Password</Label>
                                <Input
                                    id="register-password"
                                    name="password"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    minLength={8}
                                    disabled={isLoading}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="register-confirm-password">Confirm Password</Label>
                                <Input
                                    id="register-confirm-password"
                                    name="confirmPassword"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    minLength={8}
                                    disabled={isLoading}
                                />
                            </div>

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? "Creating account..." : "Create Account"}
                            </Button>
                        </form>
                    </TabsContent>
                </Tabs>
            </DialogContent>
        </Dialog>
    );
}
