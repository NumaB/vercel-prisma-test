import { schema } from "@/src/components/registrationSchema";
import { NextRequest, NextResponse } from "next/server";

// Possibilité de tester la bonne validation via curl
// Ex: curl -X POST http://localhost:3000/api/register -d "{}" -H 'Content-Type: application/json'
export async function POST(req: NextRequest) {

  // Récupération des données du body sous forme de json
  const data = await req.json();

  // Validation en fonction du schema de la data qu'on veut envoyer au serveur
  const parsed = schema.safeParse(data);

  if (parsed.success) {
    // Add parsed.data to the database
    return NextResponse.json({ message: "User registered", data: parsed.data });
  } else {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
}
