# Bean to Stalk - Children's Education & Book Store

A React-based e-commerce platform for children's educational books and resources.

## Features

- 📚 Book catalog with detailed product pages
- 🛒 Shopping cart functionality
- 🎨 Educational activities and resources
- 👨‍🏫 Kids writing classes
- 📝 Blog with educational content
- 🌍 Multi-currency support (USD/CAD)
- 📱 Responsive design

## Environment Setup

### API Keys Required

This application uses external APIs for currency conversion and geolocation. You'll need to obtain API keys from:

1. **IPData.co** - For geolocation services
   - Sign up at: https://ipdata.co
   - Get your API key from the dashboard

2. **FXRatesAPI.com** - For currency exchange rates
   - Sign up at: https://fxratesapi.com
   - Get your access token from the dashboard

### Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Fill in your actual API keys in `.env.local`:
   ```
   VITE_IPDATA_API_KEY=your_ipdata_api_key_here
   VITE_FXRATES_API_KEY=your_fxrates_api_key_here
   ```

3. For production, create `.env.production` with the same structure.

### Security Note

- Never commit `.env*` files to version control
- API keys are prefixed with `VITE_` to be accessible in the client-side application
- The `.gitignore` file is configured to exclude all environment files

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Currency Support

The application automatically detects the user's location and displays prices in their local currency:

- 🇺🇸 **USD** - United States Dollar (default)
- 🇨🇦 **CAD** - Canadian Dollar

Users can also manually switch currencies using the currency selector in the header.

## Project Structure

```
src/
├── components/          # Reusable UI components
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── data/               # Static data and types
└── index.css           # Global styles
```

## Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Vite** - Build tool
- **React Router** - Navigation
- **Lucide React** - Icons

## API Integration

### Currency Detection Flow

1. **Geolocation**: IPData.co API detects user's country
2. **Currency Mapping**: Country code maps to supported currency
3. **Exchange Rates**: FXRatesAPI.com provides current conversion rates
4. **Price Display**: All prices automatically convert from USD base

### Error Handling

- Graceful fallback to USD if APIs fail
- Loading states during currency detection
- Manual currency switching as backup

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

Private project - All rights reserved.