export default function Footer() {
  return (
    <footer className="py-8 bg-secondary/30 border-t border-border">
      <div className="container mx-auto px-4 text-center">
        <p className="text-secondary-foreground">
          © {new Date().getFullYear()} CrowdCloud. All rights reserved.
        </p>
      </div>
    </footer>
  )
};