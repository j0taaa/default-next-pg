import { render, screen, waitFor } from "@testing-library/react";
import DashboardPage from "@/app/dashboard/page";

const push = vi.fn();
const refresh = vi.fn();

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push,
    refresh,
  }),
}));

vi.mock("@/lib/auth-client", () => ({
  useSession: () => ({
    data: {
      user: {
        name: "Ada Lovelace",
      },
    },
    isPending: false,
  }),
  signOut: vi.fn(),
}));

describe("DashboardPage", () => {
  beforeEach(() => {
    push.mockClear();
    refresh.mockClear();
  });

  it("renders the user greeting and todos", async () => {
    const todos = [
      {
        id: "todo-1",
        title: "Buy milk",
        completed: false,
        createdAt: "2024-01-01T00:00:00Z",
      },
    ];

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => todos,
    });

    global.fetch = fetchMock as unknown as typeof fetch;

    render(<DashboardPage />);

    expect(
      await screen.findByRole("heading", { name: "Dashboard" })
    ).toBeInTheDocument();
    expect(screen.getByText(/Welcome, Ada Lovelace/)).toBeInTheDocument();

    await waitFor(() => expect(fetchMock).toHaveBeenCalledWith("/api/todos"));
    expect(screen.getByText("Buy milk")).toBeInTheDocument();
  });
});
