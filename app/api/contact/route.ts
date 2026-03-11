import { NextRequest, NextResponse } from "next/server";
import { saveContactSubmission } from "@/lib/db";

// Validation helpers
const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const sanitizeString = (str: string): string => {
  return str.trim().replace(/[<>]/g, "");
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Extract and validate fields
    const { name, email, message } = body;

    // Validate required fields
    if (!name || typeof name !== "string") {
      return NextResponse.json(
        { error: "Name is required and must be a string" },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string") {
      return NextResponse.json(
        { error: "Email is required and must be a string" },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required and must be a string" },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedName = sanitizeString(name);
    const sanitizedEmail = sanitizeString(email).toLowerCase();
    const sanitizedMessage = sanitizeString(message);

    // Validate field lengths
    if (sanitizedName.length === 0 || sanitizedName.length > 120) {
      return NextResponse.json(
        { error: "Name must be between 1 and 120 characters" },
        { status: 400 }
      );
    }

    if (sanitizedEmail.length === 0 || sanitizedEmail.length > 255) {
      return NextResponse.json(
        { error: "Email must be between 1 and 255 characters" },
        { status: 400 }
      );
    }

    if (sanitizedMessage.length === 0) {
      return NextResponse.json(
        { error: "Message cannot be empty" },
        { status: 400 }
      );
    }

    // Validate email format
    if (!isValidEmail(sanitizedEmail)) {
      return NextResponse.json(
        { error: "Please provide a valid email address" },
        { status: 400 }
      );
    }

    // Save to database
    const result = await saveContactSubmission({
      name: sanitizedName,
      email: sanitizedEmail,
      message: sanitizedMessage,
    });

    if (!result.success) {
      console.error("Failed to save contact submission:", result.error);
      return NextResponse.json(
        { error: "Failed to save your message. Please try again later." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message. We will get back to you soon!",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact API error:", error);

    // Handle JSON parse errors
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: "Invalid request format" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}

// Handle other methods
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}
