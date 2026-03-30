/**
 * Client-side service to interact with local Ollama instance
 * Must run on browser to access localhost:11434 directly without CORS issues
 * (Assuming Ollama starts with OLLAMA_ORIGINS="*" or similar if needed,
 * but usually localhost to localhost works if ports are mapped, 
 * or we just make standard fetch requests)
 */

const OLLAMA_BASE_URL = 'http://localhost:11434';

export interface OllamaModel {
  name: string;
  modified_at: string;
  size: number;
}

export const ollamaService = {
  /**
   * Check if Ollama is running and get available models
   */
  async checkConnection(): Promise<{ connected: boolean; models: string[] }> {
    try {
      const response = await fetch(`${OLLAMA_BASE_URL}/api/tags`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      
      if (!response.ok) throw new Error('Network response was not ok');
      
      const data = (await response.json()) as { models: OllamaModel[] };
      return {
        connected: true,
        models: data.models?.map((m) => m.name) || [],
      };
    } catch (error) {
      console.error('Ollama connection failed:', error);
      return { connected: false, models: [] };
    }
  },

  /**
   * Process note content to extract structured metadata
   */
  async processNote(content: string, model: string = 'llama3'): Promise<{
    summary: string;
    tags: string[];
    category: string;
  }> {
    const prompt = `
You are an expert knowledge management AI. Analyze the following document and extract metadata.
DOCUMENT:
${content}

Provide your analysis EXACTLY in this JSON format without any markdown blocks or other text:
{
  "summary": "A concise 3-line summary of the content.",
  "tags": ["tag1", "tag2", "tag3"],
  "category": "One single short category name (e.g. Work, Study, Project, Idea)"
}
`;

    try {
      const response = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          prompt,
          stream: false,
          format: 'json',
        }),
      });

      if (!response.ok) throw new Error('Generation failed');

      const data = (await response.json()) as { response: string };
      const parsed = JSON.parse(data.response);
      
      return {
        summary: parsed.summary || '',
        tags: parsed.tags || [],
        category: parsed.category || 'Uncategorized',
      };
    } catch (error) {
      console.error('Ollama processing failed:', error);
      throw error;
    }
  }
};
