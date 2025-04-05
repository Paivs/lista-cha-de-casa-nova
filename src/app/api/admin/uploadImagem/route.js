import { writeFile } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    console.log(file)

    if (!file) {
      return new Response(
        JSON.stringify({ error: "Nenhuma imagem enviada" }),
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = `${uuidv4()}_${file.name}`;
    const filePath = join(process.cwd(), "public", "produtos", filename);
    
    await writeFile(filePath, buffer);

    const imageUrl = `/produtos/${filename}`;

    return new Response(
      JSON.stringify({ url: imageUrl }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ error: "Erro ao fazer upload da imagem" }),
      { status: 500 }
    );
  }
}
