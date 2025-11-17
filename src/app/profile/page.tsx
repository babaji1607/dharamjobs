"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ProfilePage() {
    const { session, isLoading } = useAuth();
    const router = useRouter();
    const { toast } = useToast();
    const [isSaving, setIsSaving] = useState(false);
    const [userRole, setUserRole] = useState<"SEEKER" | "EMPLOYER">("SEEKER");

    const [basicInfo, setBasicInfo] = useState({
        name: "",
        email: "",
        phone: "",
    });

    const [seekerProfile, setSeekerProfile] = useState({
        bio: "",
        experienceYears: "",
        skills: "",
        location: "",
        education: "",
        preferredRoles: "",
        isVegetarian: false,
        isNonSmoker: false,
        spiritualPractice: "NONE",
    });

    const [employerProfile, setEmployerProfile] = useState({
        orgName: "",
        orgType: "TEMPLE",
        missionStatement: "",
        location: "",
        websiteUrl: "",
        vegetarianOnly: false,
        providesStay: false,
        providesFood: false,
    });

    useEffect(() => {
        if (!isLoading && !session) {
            router.push("/");
        }

        if (session?.user) {
            setBasicInfo({
                name: session.user.name || "",
                email: session.user.email || "",
                phone: session.user.phone || "",
            });
            setUserRole(session.user.role || "SEEKER");

            // Fetch user profile data
            fetchProfile();
        }
    }, [session, isLoading, router]);

    const fetchProfile = async () => {
        try {
            const response = await fetch("/api/user/profile");
            if (response.ok) {
                const data = await response.json();

                if (data.profile) {
                    setSeekerProfile({
                        bio: data.profile.bio || "",
                        experienceYears: data.profile.experienceYears?.toString() || "",
                        skills: data.profile.skills?.join(", ") || "",
                        location: data.profile.location || "",
                        education: data.profile.education || "",
                        preferredRoles: data.profile.preferredRoles?.join(", ") || "",
                        isVegetarian: data.profile.isVegetarian || false,
                        isNonSmoker: data.profile.isNonSmoker || false,
                        spiritualPractice: data.profile.spiritualPractice || "NONE",
                    });
                }

                if (data.employerProfile) {
                    setEmployerProfile({
                        orgName: data.employerProfile.orgName || "",
                        orgType: data.employerProfile.orgType || "TEMPLE",
                        missionStatement: data.employerProfile.missionStatement || "",
                        location: data.employerProfile.location || "",
                        websiteUrl: data.employerProfile.websiteUrl || "",
                        vegetarianOnly: data.employerProfile.vegetarianOnly || false,
                        providesStay: data.employerProfile.providesStay || false,
                        providesFood: data.employerProfile.providesFood || false,
                    });
                }
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        }
    };

    const handleBasicInfoUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const response = await fetch("/api/user/update", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(basicInfo),
            });

            if (response.ok) {
                toast({
                    title: "Success",
                    description: "Basic information updated successfully",
                });
            } else {
                throw new Error("Failed to update");
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update information",
                variant: "destructive",
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleSeekerProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const response = await fetch("/api/user/profile/seeker", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    ...seekerProfile,
                    experienceYears: parseInt(seekerProfile.experienceYears) || 0,
                    skills: seekerProfile.skills.split(",").map(s => s.trim()).filter(Boolean),
                    preferredRoles: seekerProfile.preferredRoles.split(",").map(r => r.trim()).filter(Boolean),
                }),
            });

            if (response.ok) {
                toast({
                    title: "Success",
                    description: "Job seeker profile updated successfully",
                });
            } else {
                throw new Error("Failed to update");
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update profile",
                variant: "destructive",
            });
        } finally {
            setIsSaving(false);
        }
    };

    const handleEmployerProfileUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const response = await fetch("/api/user/profile/employer", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(employerProfile),
            });

            if (response.ok) {
                toast({
                    title: "Success",
                    description: "Employer profile updated successfully",
                });
            } else {
                throw new Error("Failed to update");
            }
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to update profile",
                variant: "destructive",
            });
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center">
                <p>Loading...</p>
            </div>
        );
    }

    if (!session) {
        return null;
    }

    return (
        <>
            <Navbar onPostJobClick={() => { }} />
            <main className="container mx-auto px-4 py-8">
                <div className="mx-auto max-w-4xl">
                    <h1 className="mb-6 text-3xl font-bold">My Profile</h1>

                    <Tabs defaultValue="basic" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="basic">Basic Info</TabsTrigger>
                            <TabsTrigger value="seeker">Job Seeker</TabsTrigger>
                            <TabsTrigger value="employer">Employer</TabsTrigger>
                        </TabsList>

                        <TabsContent value="basic">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Basic Information</CardTitle>
                                    <CardDescription>
                                        Update your basic profile information
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleBasicInfoUpdate} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name</Label>
                                            <Input
                                                id="name"
                                                value={basicInfo.name}
                                                onChange={(e) =>
                                                    setBasicInfo({ ...basicInfo, name: e.target.value })
                                                }
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                value={basicInfo.email}
                                                disabled
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input
                                                id="phone"
                                                type="tel"
                                                value={basicInfo.phone}
                                                onChange={(e) =>
                                                    setBasicInfo({ ...basicInfo, phone: e.target.value })
                                                }
                                            />
                                        </div>

                                        <Button type="submit" disabled={isSaving}>
                                            {isSaving ? "Saving..." : "Save Changes"}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="seeker">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Job Seeker Profile</CardTitle>
                                    <CardDescription>
                                        Complete your profile to apply for jobs
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleSeekerProfileUpdate} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="bio">Bio</Label>
                                            <Textarea
                                                id="bio"
                                                value={seekerProfile.bio}
                                                onChange={(e) =>
                                                    setSeekerProfile({ ...seekerProfile, bio: e.target.value })
                                                }
                                                placeholder="Tell us about yourself..."
                                                rows={4}
                                            />
                                        </div>

                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="experience">Experience (Years)</Label>
                                                <Input
                                                    id="experience"
                                                    type="number"
                                                    value={seekerProfile.experienceYears}
                                                    onChange={(e) =>
                                                        setSeekerProfile({
                                                            ...seekerProfile,
                                                            experienceYears: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="location">Location</Label>
                                                <Input
                                                    id="location"
                                                    value={seekerProfile.location}
                                                    onChange={(e) =>
                                                        setSeekerProfile({
                                                            ...seekerProfile,
                                                            location: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="education">Education</Label>
                                            <Input
                                                id="education"
                                                value={seekerProfile.education}
                                                onChange={(e) =>
                                                    setSeekerProfile({
                                                        ...seekerProfile,
                                                        education: e.target.value,
                                                    })
                                                }
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="skills">Skills (comma-separated)</Label>
                                            <Input
                                                id="skills"
                                                value={seekerProfile.skills}
                                                onChange={(e) =>
                                                    setSeekerProfile({ ...seekerProfile, skills: e.target.value })
                                                }
                                                placeholder="React, Node.js, Python"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="preferredRoles">Preferred Roles (comma-separated)</Label>
                                            <Input
                                                id="preferredRoles"
                                                value={seekerProfile.preferredRoles}
                                                onChange={(e) =>
                                                    setSeekerProfile({
                                                        ...seekerProfile,
                                                        preferredRoles: e.target.value,
                                                    })
                                                }
                                                placeholder="Priest, Teacher, Developer"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="spiritualPractice">Spiritual Practice</Label>
                                            <Select
                                                value={seekerProfile.spiritualPractice}
                                                onValueChange={(value) =>
                                                    setSeekerProfile({
                                                        ...seekerProfile,
                                                        spiritualPractice: value,
                                                    })
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="REGULAR">Regular</SelectItem>
                                                    <SelectItem value="OCCASIONAL">Occasional</SelectItem>
                                                    <SelectItem value="NONE">None</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="vegetarian"
                                                    checked={seekerProfile.isVegetarian}
                                                    onCheckedChange={(checked) =>
                                                        setSeekerProfile({
                                                            ...seekerProfile,
                                                            isVegetarian: checked as boolean,
                                                        })
                                                    }
                                                />
                                                <Label htmlFor="vegetarian">Vegetarian</Label>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="nonSmoker"
                                                    checked={seekerProfile.isNonSmoker}
                                                    onCheckedChange={(checked) =>
                                                        setSeekerProfile({
                                                            ...seekerProfile,
                                                            isNonSmoker: checked as boolean,
                                                        })
                                                    }
                                                />
                                                <Label htmlFor="nonSmoker">Non-Smoker</Label>
                                            </div>
                                        </div>

                                        <Button type="submit" disabled={isSaving}>
                                            {isSaving ? "Saving..." : "Save Profile"}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="employer">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Employer Profile</CardTitle>
                                    <CardDescription>
                                        Complete your organization profile to post jobs
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <form onSubmit={handleEmployerProfileUpdate} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="orgName">Organization Name</Label>
                                            <Input
                                                id="orgName"
                                                value={employerProfile.orgName}
                                                onChange={(e) =>
                                                    setEmployerProfile({
                                                        ...employerProfile,
                                                        orgName: e.target.value,
                                                    })
                                                }
                                                required
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="orgType">Organization Type</Label>
                                            <Select
                                                value={employerProfile.orgType}
                                                onValueChange={(value) =>
                                                    setEmployerProfile({ ...employerProfile, orgType: value })
                                                }
                                            >
                                                <SelectTrigger>
                                                    <SelectValue />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="TEMPLE">Temple</SelectItem>
                                                    <SelectItem value="ASHRAM">Ashram</SelectItem>
                                                    <SelectItem value="NGO">NGO</SelectItem>
                                                    <SelectItem value="SCHOOL">School</SelectItem>
                                                    <SelectItem value="BUSINESS">Business</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="missionStatement">Mission Statement</Label>
                                            <Textarea
                                                id="missionStatement"
                                                value={employerProfile.missionStatement}
                                                onChange={(e) =>
                                                    setEmployerProfile({
                                                        ...employerProfile,
                                                        missionStatement: e.target.value,
                                                    })
                                                }
                                                rows={4}
                                            />
                                        </div>

                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div className="space-y-2">
                                                <Label htmlFor="org-location">Location</Label>
                                                <Input
                                                    id="org-location"
                                                    value={employerProfile.location}
                                                    onChange={(e) =>
                                                        setEmployerProfile({
                                                            ...employerProfile,
                                                            location: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="websiteUrl">Website URL</Label>
                                                <Input
                                                    id="websiteUrl"
                                                    type="url"
                                                    value={employerProfile.websiteUrl}
                                                    onChange={(e) =>
                                                        setEmployerProfile({
                                                            ...employerProfile,
                                                            websiteUrl: e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="vegetarianOnly"
                                                    checked={employerProfile.vegetarianOnly}
                                                    onCheckedChange={(checked) =>
                                                        setEmployerProfile({
                                                            ...employerProfile,
                                                            vegetarianOnly: checked as boolean,
                                                        })
                                                    }
                                                />
                                                <Label htmlFor="vegetarianOnly">Vegetarian Only Environment</Label>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="providesStay"
                                                    checked={employerProfile.providesStay}
                                                    onCheckedChange={(checked) =>
                                                        setEmployerProfile({
                                                            ...employerProfile,
                                                            providesStay: checked as boolean,
                                                        })
                                                    }
                                                />
                                                <Label htmlFor="providesStay">Provides Accommodation</Label>
                                            </div>

                                            <div className="flex items-center space-x-2">
                                                <Checkbox
                                                    id="providesFood"
                                                    checked={employerProfile.providesFood}
                                                    onCheckedChange={(checked) =>
                                                        setEmployerProfile({
                                                            ...employerProfile,
                                                            providesFood: checked as boolean,
                                                        })
                                                    }
                                                />
                                                <Label htmlFor="providesFood">Provides Food</Label>
                                            </div>
                                        </div>

                                        <Button type="submit" disabled={isSaving}>
                                            {isSaving ? "Saving..." : "Save Profile"}
                                        </Button>
                                    </form>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </main>
            <Footer />
        </>
    );
}
