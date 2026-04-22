---
name: initial
description: Describe when to use this prompt
---

<!-- Tip: Use /create-prompt in chat to generate content with agent assistance -->

 also what should i look for? sync or async stuff? asgi or wsgi?

For an AI Hackathon, the choice between Sync vs. Async and WSGI vs. ASGI isn't just a technical detail—it’s a performance strategy. Because AI models are slow (I/O bound), how you handle the "waiting" will determine if your app feels laggy or professional.

Here is exactly what you should look for:
1. The Verdict: Go Async + ASGI

For an AI project in 2026, ASGI is the correct choice.

    Why ASGI? Standard WSGI (the old way) is like a bank with only one teller. If one person has a complicated transaction (like an AI model generating a long response), everyone else in line has to wait. ASGI allows the "teller" to start the AI task, set it aside, and help the next customer while the AI finishes.

    The AI Connection: Most AI work happens via API calls (OpenAI, Anthropic) or local model inference. These are I/O bound tasks. Async allows your server to handle dozens of concurrent users while those AI calls are "hanging."

2. Key Things to Learn (The "Cheat Sheet")
A. Async Views

Instead of def my_view(request):, use async def. This is where you'll call your AI.
Python

import asyncio
from django.http import HttpResponse

async def ai_chat_view(request):
    # Imagine this is a slow call to Llama or GPT
    response_text = await call_ai_api(request.POST.get('prompt')) 
    return HttpResponse(response_text)

B. Streaming Responses (The "Wow" Factor)

In a hackathon, showing a spinner for 10 seconds is boring. Streaming tokens one-by-one as the AI "thinks" looks impressive. Use StreamingHttpResponse.
C. The ORM "a" Prefix

Since you're on Django 5.x/6.x, almost every database method has an async version.

    Sync: Task.objects.all()

    Async: [t async for t in Task.objects.all()] or await Task.objects.aget(id=1)

    Rule of thumb: If you are in an async def view, always use the version starting with a.

3. Recommended Tech Stack for the Hackathon

Since you're aiming for speed and a professional feel, use these specific tools:

    Server: Uvicorn (The most popular ASGI server). Just run uvicorn myproject.asgi:application.

    HTTP Client: HTTPX. Do not use requests. requests is synchronous and will "block" your entire async server. Use httpx.AsyncClient().

    Frontend Interaction: HTMX. It has built-in support for "SSE" (Server-Sent Events), which is how you stream that AI text into the page.

4. Summary Table: Sync vs. Async
Feature	Sync (WSGI)	Async (ASGI)
Best For	CRUD apps, simple logic	AI, Chatbots, Real-time data
Concurrency	Threads (limited)	Event Loop (high)
LLM Streaming	Difficult/Hacky	Native & Smooth
Difficulty	Easy	Medium (Need to use await)
My Advice for the Hackathon:

Start Sync, then "Ascend" to Async.
Don't get bogged down in async syntax if you're struggling to get the core AI logic working. Django 6.x is "hybrid"—you can have some sync views and some async views in the same project. Get your "Add Task" logic working sync, and save the async def for the specific view that talks to the AI.

Since you've worked with C++ and messaging middleware (NATS/ZeroMQ), the concept of "non-blocking" will actually feel very familiar to you once you see how Python's async/await handles the event loop!

Are you planning to use an external API (like OpenAI) or are you trying to run a model locally on your machine?

concepts and libraries i need to study to easily integrate ai into my django web app

To move from a simple task list to a production-grade AI app, you’ll need to master how to handle long-running tasks, structured data, and streaming.

Here are the essential concepts and libraries for your 2026 AI Hackathon stack:
1. Orchestration & Agents (The "Brain")

You need a way to chain prompts together and give the AI "tools" (like your Stock Market search or CoC API).

    PydanticAI (Recommended for 2026): This has quickly become the favorite for Django devs because it uses Pydantic for type safety. It ensures the AI returns valid JSON that your Django models can actually use.

    LangChain / LangGraph: Best if you need complex, multi-step "loops" where the AI thinks, checks a tool, and thinks again.

    Smolagents (by Hugging Face): A lightweight alternative if you want your AI to write and execute small Python snippets to solve problems.

2. Asynchronous Handling (The "Piping")

Since AI calls can take 10+ seconds, you cannot let them block your Django server.

    HTTPX: Replace the requests library. It’s asynchronous, allowing you to call OpenAI or Anthropic without freezing your app.

    StreamingHttpResponse: This is a built-in Django class. Use it to "drip" text to the frontend token-by-token.

    SSE (Server-Sent Events): HTMX has an extension (sse.js) that lets your Django backend "push" updates to the page as the AI finishes different steps (e.g., "Step 1: Searching PSX... Done").

3. Data & Memory (The "Context")

AI is only as good as the data you give it.

    LlamaIndex: If you have large PDFs or text files (like stock reports) that the AI needs to "read," this is the best library for RAG (Retrieval-Augmented Generation).

    PostgreSQL + pgvector: You don't need a separate "Vector Database." Use the pgvector extension for Postgres to store and search AI embeddings directly in your existing Django DB.

    Django-Lifecycle: Great for triggering AI actions automatically when a model is saved (e.g., "When a new Task is created, have AI categorize it").

4. Front-End "AI Feel"

    HTMX hx-trigger="load": Use this to start an AI generation after the initial page loads, so the user isn't staring at a white screen while the model thinks.

    Alpine.js x-effect: Perfect for auto-scrolling a chat window to the bottom as new text streams in.

Your Study Roadmap
Phase	Topic	Why?
Day 1	PydanticAI	Learn to get consistent data from an LLM.
Day 2	HTTPX + Async Views	Learn to make non-blocking API calls.
Day 3	HTMX SSE Extension	Learn to stream AI text to your UI.
Day 4	Vector Embeddings	Learn how to let the AI "search" your database.
Pro-Tip for the Hackathon:

Don't try to build your own "Vector Search" from scratch. Use LlamaIndex to index your data and PydanticAI to talk to the model. This combination is the fastest way to a "shippable" product.

Which part of the "AI experience" are you most worried about—the speed of the response, or getting the AI to actually follow instructions?
