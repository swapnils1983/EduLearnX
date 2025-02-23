import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function AuthCard(props) {
    const { title, description, children, className } = props;

    return (
        <Card className={cn("w-full max-w-md mx-auto", className)}>
            <CardHeader>
                <CardTitle className="text-2xl font-semibold text-center">{title}</CardTitle>
                {description && <CardDescription className="text-center">{description}</CardDescription>}
            </CardHeader>
            <CardContent>{children}</CardContent>
        </Card>
    );
}

export default AuthCard;
